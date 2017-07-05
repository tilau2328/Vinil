const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { MaterialType } = require('../../types');

const ListMaterials = {
  name: 'ListMaterials',
  type: new GraphQLList(MaterialType),
  resolve: resolvers.list
};

const GetMaterial = {
  name: 'GetMaterial',
  type: MaterialType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.get
};

module.exports = {
  ListMaterials,
  GetMaterial
}
