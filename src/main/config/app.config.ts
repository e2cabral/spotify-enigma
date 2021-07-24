import 'reflect-metadata';
import { config } from 'dotenv'
import fastify from 'fastify';
import setupRoutes from './routes.config';

const app = fastify({ logger: true });

config();
setupRoutes(app);

export default app;
