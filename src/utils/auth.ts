import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Gera um token JWT a partir de um payload.
 * @param {object} payload - Dados que serão codificados no token.
 * @returns {string} Token JWT gerado.
 */
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};


/**
 * Verifica e decodifica um token JWT.
 * @param {string} token - Token JWT no formato "Bearer <token>".
 * @returns {object | null} Payload decodificado ou null se inválido.
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
  } catch {
    return null;
  }
};
