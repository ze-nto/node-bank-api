import { GraphQLInt, GraphQLList, GraphQLBoolean } from "graphql";
import Account from '../types/Account.js';
import AccountInput from '../types/AccountInput.js';
import AccountResolver from '../resolvers/account.resolver.js' 

const accountMutations = {
  createAccount: {
    type: Account,
    args: {
      account: {
        name: 'account',
        type: AccountInput
      }
    },
    resolve: (_, args) => AccountResolver.createAccount(args.account)
  },
  deleteAccount:{
    type: GraphQLBoolean,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt
      }
    },
    resolve: (_, args) => AccountResolver.deleteAccount(args.id)
  },
  updateAccount: {
    type: Account,
    args: {
      account: {
        name: 'account',
        type: AccountInput
      }
    },
    resolve: (_, args) => AccountResolver.updateAccount(args.account)
  }

}


export default accountMutations;