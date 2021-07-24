import { FastifyInstance } from 'fastify';
import { readdirSync } from 'fs';

export default (app: FastifyInstance) => {
  readdirSync(`${__dirname}/../routes`).map(async (file: string) => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`./../routes/${file}`)).default(app);
    }
  });
};
