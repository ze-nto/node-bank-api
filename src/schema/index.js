import { GraphQLSchema, GraphQLObjectType } from "graphql";
import AccountQueries from './queries/account.query.js';
import AccountMutations from './mutations/account.mutation.js';

const Schema = new GraphQLSchema({
  types: null,
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { 
      ...AccountQueries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      ...AccountMutations
    }
  })
});

export default Schema;