import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './graphql/schemas/schema';
import { verifyToken } from './utils/auth';
import dotenv from 'dotenv';

dotenv.config();

export const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const server = new ApolloServer({ schema });
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = verifyToken(token);
        return { user };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};
