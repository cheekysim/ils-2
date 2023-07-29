import express from 'express';
import { createClient } from 'redis';
import { getToken } from './auth.js';
import { ping } from './ping.js';
import { getData } from './get.js';

const router = express.Router();

const redis = createClient({
	url: `redis://${process.env.SERVER_IP}:6379`,
})
	.on('ready', () => console.log('Connected to Redis'))
	.on('end', () => console.log('Disconnected from Redis'));

const apiPath = '/' + __dirname.split(/[\\/]/g).slice(-2).join('/');

console.log(apiPath);

interface LeaderboardBody {
	data: {
		__typename: string;
		leaderboardConnection: {
			currentPage: number;
			totalCount: number;
			pageInfo: {
				startCursor: string;
				endCursor: string;
				__typename: string;
			};
			edges: LeaderboardMemberEdge[];
			__typename: string;
		};
	};
}

interface LeaderboardMemberEdge {
	cursor: string;
	position: number;
	node: {
		id: string;
		title: string;
		points: number;
		__typename: string;
		profileAvatar: {
			id: string | null;
			versionUrl: string | null;
			__typename: string;
		};
	};
	__typename: string;
}

router.get(`${apiPath}/data`, async (req, res) => {
	let redisAttempts = 0;
	let connected = false;

	while (!connected && redisAttempts < 3) {
		try {
			await redis.connect();
			connected = true;
		} catch (error) {
			redisAttempts++;
			console.log(`Redis Failed | ${redisAttempts} / 3`);
		}
	}

	let token;

	if (!connected) {
		token = await getToken();
	} else {
		token = (await redis.get('il-token')) || (await getToken());

		const valid = await ping(token);
		if (!valid) {
			token = await getToken();
		}

		await redis.set('il-token', token);
		await redis.disconnect();
	}

	const data = await getData(token);

	res.send(parseILData(data));
});

function parseILData(data: LeaderboardBody) {
	return data.data.leaderboardConnection.edges.reduce(
		(
			orgs: { [key: string]: { points: number; position: number } },
			edge,
		) => {
			const id = edge.node.id.replace(/-/g, '_');
			const points = edge.node.points;
			const position = edge.position;
			orgs[id] = { points, position };
			return orgs;
		},
		{},
	);
}

export default router;
