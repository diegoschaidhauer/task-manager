import { userResolvers } from '../graphql/resolvers/user.resolver';
import * as authUtils from '../utils/auth';
import * as hashUtils from '../utils/hash';
import { User } from '../models/User';

jest.mock('../models/User');
jest.mock('../utils/auth');
jest.mock('../utils/hash');

describe('User Resolvers - Integration with Mocks', () => {
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
    it('should register a new user successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (hashUtils.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (User.create as jest.Mock).mockResolvedValue(fakeUser);
      (authUtils.generateToken as jest.Mock).mockReturnValue('mocked-jwt');

      const result = await userResolvers.Mutation.register(
        {},
        { name: 'Diego', email: 'diego@example.com', password: '123456' }
      );

      expect(User.findOne).toHaveBeenCalledWith({ email: 'diego@example.com' });
      expect(hashUtils.hashPassword).toHaveBeenCalledWith('123456');
      expect(User.create).toHaveBeenCalledWith({
        name: 'Diego',
        email: 'diego@example.com',
        password: 'hashedPassword',
      });
      expect(authUtils.generateToken).toHaveBeenCalledWith({ id: 'user123' });

      expect(result).toEqual({
        token: 'mocked-jwt',
        user: fakeUser,
      });
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (hashUtils.comparePassword as jest.Mock).mockResolvedValue(true);
      (authUtils.generateToken as jest.Mock).mockReturnValue('mocked-jwt');

      const result = await userResolvers.Mutation.login(
        {},
        { email: 'diego@example.com', password: '123456' }
      );

      expect(User.findOne).toHaveBeenCalledWith({ email: 'diego@example.com' });
      expect(hashUtils.comparePassword).toHaveBeenCalledWith('123456', 'hashedPassword');
      expect(authUtils.generateToken).toHaveBeenCalledWith({ id: 'user123' });

      expect(result).toEqual({
        token: 'mocked-jwt',
        user: fakeUser,
      });
    });
  });
});
