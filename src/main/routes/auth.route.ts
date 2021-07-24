import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { stringify } from 'query-string';
import axios from 'axios';
import randomStringGenerator from '../../infra/helpers/random-string-generator.helper';

export default (app: FastifyInstance): void => {
  app.register((instance: FastifyInstance, opts, done) => {
    instance
      .get('/login', {
        handler: (request: FastifyRequest, reply: FastifyReply) => {
          const scope = 'user-read-private user-read-email';
          const state = randomStringGenerator(8);
          const responseType = 'token';

          reply
            .redirect(
              `https://accounts.spotify.com/authorize?${stringify({
                response_type: responseType,
                client_id: process.env.CLIENT_ID,
                redirect_uri: process.env.REDIRECT_URI,
                scope,
                state,
              })}`,
            );
        },
      })
      .get('/callback', {
        handler: (request: FastifyRequest, reply: FastifyReply) => {
          reply.send(request.query);
        },
      })
      // Just a test
      .get('/list', {
        handler: (request: FastifyRequest, reply: FastifyReply) => {
          const token = 'BQCgHflvfektVYNYQEKGvMnrtOBQJSBhqLM7rIzR-qskouIG87_mar_12XIRQD80Gbw5WqJh77iS_c1kOuTe0OjLtuIrlgxeNpY23NnY_CT_O2MAMOH7HSgcR7UvfrSXM23gUNtR14i1GBfsdmbQNDwGpJSBjf2QQdqQYKnxNw3nb90&token_type=Bearer&expires_in=3600&state=XrDYgb00';
          axios
            .get(
              'https://api.spotify.com/v1/me',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  ContentType: 'application/json',
                },
              },
            )
            .then((data) => reply.send(data.data))
            .catch((err) => reply.send(err));
        },
      });
    done();
  });
};
