import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../types';


export const schema = makeExecutableSchema({
  typeDefs,

});
