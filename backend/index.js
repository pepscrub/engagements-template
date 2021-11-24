import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import color from 'chalk';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import api from './api/api.js'
import middlewares from './routes/middlewares.js';
import expressWs from 'express-ws';

const app = express();
const ws = expressWs(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>
{
    console.log(color.blue.bold(`[nodeJS]`), `Server is listening on port: ${PORT}`);
})

app.set('trust proxy', 1);
app.use(morgan(middlewares.logging));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);