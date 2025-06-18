import { startServer } from './server';
import { connectDB } from './config/database';

(async () => {
  await connectDB();
  await startServer();
})();
