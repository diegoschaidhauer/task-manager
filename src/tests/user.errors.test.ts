import { userResolvers } from '../graphql/resolvers/user.resolver';
import * as authUtils from '../utils/auth';
import * as hashUtils from '../utils/hash';
import { User } from '../models/User';

jest.mock('../models/User');
jest.mock('../utils/auth');
jest.mock('../utils/hash');

describe('User Resolver - Error Cases', () => {
  const fakeUser = {
    id: 'user123',
    name: 'Diego',
    email: 'diego@example.com',
    password: 'hashedPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw error if email already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(fakeUser);

      await expect(
        userResolvers.Mutation.register(
          {},
          { name: 'Diego', email: 'diego@example.com', password: '123456' }
        )
      ).rejects.toThrow('Email already in use');
    });
  });

  describe('login', () => {
    it('should throw error if user is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        userResolvers.Mutation.login(
          {},
          { email: 'unknown@example.com', password: '123456' }
        )
      ).rejects.toThrow('User not found');
    });

    it('should throw error if password is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (hashUtils.comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(
        userResolvers.Mutation.login(
          {},
          { email: 'diego@example.com', password: 'wrongpassword' }
        )
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
