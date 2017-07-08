const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const MaterialUpdate = {
  name: 'MaterialUpdate',
  type: GraphQLID,
  args: {
    id:  { type: GraphQLID },
    supplier:  { type: GraphQLID },
    materials:  { type: new GraphQLList(GraphQLID) }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('MaterialUpdate'),
    (payload, variables) => {
      return (!variables.id && !variables.supplier)
       || payload.id === variables.id
       || payload.supplier === variables.supplier
       || (variables.materials
         && variables.materials.indexOf(payload.id) != -1)
    }
  )
};

const NewMaterial = {
  name: 'NewMaterial',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('NewMaterial')
};

const MaterialDelete = {
  name: 'MaterialDelete',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('MaterialDelete')
};

module.exports = {
  MaterialUpdate,
  MaterialDelete,
  NewMaterial
}
