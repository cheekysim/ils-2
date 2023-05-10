import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import apiV1 from './routes/api/v1/api.js';


dotenv.config();

console.log(__dirname);

const app = express();
const port = process.env.PORT || 3000;

app.use(apiV1);

// config to use json, ejs, static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

// Handle 404 requests
app.all('*', (req, res) => {
	// Redirect the user to the homepage if the request is not an API request
	if (!req.path.includes('/api/')) return res.status(302).redirect('/');
	res.status(404).render('error', { code: 418 });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
