const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { SupplierType } = require('../../types');

const CreateSupplier = {
  name: 'CreateSupplier',
  type: SupplierType,
  args: {
    name: { type: GraphQLString }
  },
  resolve: resolvers.create
};

const DeleteSupplier = {
  name: 'DeleteSupplier',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.remove
};

const UpdateSupplier = {
  name: 'UpdateSupplier',
  type: SupplierType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString }
  },
  resolve: resolvers.update
};

module.exports = {
  CreateSupplier,
  DeleteSupplier,
  UpdateSupplier
}
