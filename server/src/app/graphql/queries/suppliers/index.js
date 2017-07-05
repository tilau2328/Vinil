const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { SupplierType } = require('../../types');

const ListSuppliers = {
  name: 'ListSuppliers',
  type: new GraphQLList(SupplierType),
  resolve: resolvers.list
};

const GetSupplier = {
  name: 'GetSupplier',
  type: SupplierType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.get
};

module.exports = {
  ListSuppliers,
  GetSupplier
}
