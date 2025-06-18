import { User } from '../../models/User';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateToken } from '../../utils/auth';

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const currentUser = await User.findById(user.id);
      if (!currentUser) throw new Error('User not found');
      return currentUser;
    }
  },

  Mutation: {
    register: async (_: any, { name, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');

      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email, password: hashedPassword });

      const token = generateToken({ id: user.id });

      return { token, user };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');

      const valid = await comparePassword(password, user.password);
      if (!valid) throw new Error('Invalid credentials');

      const token = generateToken({ id: user.id });

      return { token, user };
    }
  }
};
