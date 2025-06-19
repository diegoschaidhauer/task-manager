import bcrypt from 'bcrypt';

/**
 * Gera um hash seguro para uma senha.
 * @param {string} password - A senha em texto puro.
 * @returns {Promise<string>} Retorna o hash da senha.
 */
export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

/**
 * Compara uma senha com seu hash.
 * @param {string} password - A senha em texto puro.
 * @param {string} hash - O hash da senha armazenada.
 * @returns {Promise<boolean>} Retorna true se coincidem, false caso contrário.
 */
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
