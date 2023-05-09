import axios from 'axios';

async function getData(cookie: string) {
	const options = {
		method: 'POST',
		url: 'https://api.immersivelabs.online/v1/graphql',
		params: { r: 'GetLeaderboardTableData' },
		headers: {
			cookie: `_session_id=${cookie}`,
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0',
			'content-type': 'application/json',
		},
		data: {
			operationName: 'GetLeaderboardTableData',
			variables: {
				landOnParticipantPage: false,
				first: 50,
				leaderboardContext: { type: 'GLOBAL' },
				participantType: 'ORGANISATION',
			},
			query: 'query GetLeaderboardTableData($profileId: ID = null, $leaderboardContext: LeaderboardContextInput, $participantType: LeaderboardParticipant, $landOnParticipantPage: Boolean = true, $limit: Int, $after: String = null, $before: String = null, $first: Int = null, $last: Int = null) {\n  ...GetLeaderboardData\n}\n\nfragment GetLeaderboardData on Query {\n  leaderboardConnection(profileId: $profileId, leaderboardContext: $leaderboardContext, participantType: $participantType, landOnParticipantPage: $landOnParticipantPage, limit: $limit, after: $after, before: $before, first: $first, last: $last) {\n    currentPage\n    totalCount\n    pageInfo {\n      startCursor\n      endCursor\n      __typename\n    }\n    edges {\n      cursor\n      position\n      node {\n        id\n        title\n        points\n        profileAvatar {\n          id\n          versionUrl\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n',
		},
	};

	try {
		const res = await axios.request(options);
		if (res.status.toString().startsWith('2')) {
			return res.data;
		}
	} catch (error) {
		if (error.response.status.toString().startsWith('4')) {
			return new Object;
		}
		console.log(error);
	}
}
// export ping
export { getData };
