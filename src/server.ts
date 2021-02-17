import 'reflect-metadata';
import './database';

import cors from 'cors';
import express from 'express';

import Routers from './routers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routers);

const port = process.env.PORT || 3333;

app.listen(port, () => {
	console.log(`🏃 Running Server on port ${port} `);
});
