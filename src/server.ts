import "reflect-metadata";


import express from 'express';
import cors from 'cors'
import routes from './routes';
import { AppDataSource } from './database';

AppDataSource.initialize().then(() => { console.log(`.: DATABASE ONLINE :.`) });

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`.: server only in port ${PORT} :.`));
