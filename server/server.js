import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import { APP_PORT, DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Database connection
mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('DB connected...');
});

global.appRoot = path.resolve(__dirname);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);
app.use('/uploads', express.static('uploads'));
app.use('/', (req, res) => {
	res.send(`
  <h1>Welcome to E-commerce Rest APIs</h1>
  You may reach out to me for any question related to this Apis: dhanishssuvarna123@gmail.com
  `);
});

app.use(errorHandler);

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
