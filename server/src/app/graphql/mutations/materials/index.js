const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { MaterialType } = require('../../types');

const CreateMaterial = {
  name: 'CreateMaterial',
  type: MaterialType,
  args: {
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    supplier: { type: GraphQLID },
    description: { type: GraphQLString },
    available: { type: GraphQLInt },
    metric: { type: GraphQLString }
  },
  resolve: resolvers.create
};

const DeleteMaterial = {
  name: 'DeleteMaterial',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.remove
};

const UpdateMaterial = {
  name: 'UpdateMaterial',
  type: MaterialType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    supplier: { type: GraphQLID },
    description: { type: GraphQLString },
    available: { type: GraphQLInt },
    metric: { type: GraphQLString }
  },
  resolve: resolvers.update
};

module.exports = {
  CreateMaterial,
  DeleteMaterial,
  UpdateMaterial
}
