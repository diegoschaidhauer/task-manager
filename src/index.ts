import { startServer } from './server';
import { connectDB } from './config/database';

/**
 * Entry point da aplicação.
 * Inicia a conexão com o banco de dados e o servidor GraphQL.
 */
(async () => {
  await connectDB();
  await startServer();
})();
