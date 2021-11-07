//GraphQL definitions
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import AccountQueries from './queries/account.query.js';

const Schema = new GraphQLSchema({
  types: null,
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { 
      ...AccountQueries
    }
  }),
  mutation: null
});

export default Schema;