import { User } from '../../models/User';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateToken } from '../../utils/auth';

/**
 * Resolvers GraphQL para operações de usuário.
 */
export const userResolvers = {
  Query: {
    /**
     * Retorna informações do usuário autenticado.
     * @returns {User} Usuário autenticado.
     */
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error('Authentication required');
      const currentUser = await User.findById(user.id);
      if (!currentUser) throw new Error('User not found');
      return currentUser;
    }
  },

  Mutation: {
    /**
     * Registra um novo usuário.
     * @param {string} name - Nome do usuário.
     * @param {string} email - Email do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {AuthPayload} Token e dados do usuário criado.
     */
    register: async (_: any, { name, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');

      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email, password: hashedPassword });

      const token = generateToken({ id: user.id });

      return { token, user };
    },

    /**
     * Realiza o login do usuário.
     * @param {string} email - Email do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {AuthPayload} Token e dados do usuário autenticado.
     */
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const valid = await comparePassword(password, user.password);
      if (!valid) throw new Error('Invalid credentials');

      const token = generateToken({ id: user.id });

      return { token, user };
    }
  }
};
