import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './services/translationsYup';
import { router } from './routes';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api', router);

export { server };
