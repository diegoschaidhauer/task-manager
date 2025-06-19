import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Função responsável por conectar ao MongoDB.
 * Lê a string de conexão do arquivo .env (MONGO_URI).
 * @returns {Promise<void>} Retorna uma promessa concluída após conexão.
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error', error);
    process.exit(1);
  }
};
