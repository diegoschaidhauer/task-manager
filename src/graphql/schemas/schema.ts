import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../types';
import { userResolvers } from '../resolvers/user.resolver';
import { taskResolvers } from '../resolvers/task.resolver';


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [userResolvers, taskResolvers],
});
