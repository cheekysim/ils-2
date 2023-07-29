import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function getToken() {
	const options = {
		method: 'POST',
		url: 'https://api.immersivelabs.online/v1/immersive_auth/sessions',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.0.0',
		},
		data: {
			account: {
				email: process.env.EMAIL,
				password: process.env.PASSWORD,
			},
		},
	};

	// 28 03

	const res = await axios.request(options);

	const parsedCookies = parseCookies(res.headers['set-cookie']);
	console.log(`Token: ${parsedCookies['_session_id']}`);
	return parsedCookies['_session_id'];
}

function parseCookies(cookies: string | string[]): { [key: string]: string } {
	if (Array.isArray(cookies)) cookies = cookies.join('; ');
	return cookies
		.split(/; /g)
		.reduce((cookieDict: { [key: string]: string }, cookie) => {
			const [key, value] = cookie.split('=');
			cookieDict[key] = value;
			return cookieDict;
		}, {});
}

// export getToken
export { getToken };
