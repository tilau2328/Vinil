const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    projects: {
       type: new GraphQLList(ProjectType),
       resolve: resolvers.clientProjects
     }
  })
});

const ProjectMaterialType =  new GraphQLObjectType({
  name: 'ProjectMaterialType',
  fields: () => ({
    quantity: { type: GraphQLInt },
    material: { type: MaterialType }
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: resolvers.projectClient
    },
    cost: { type: GraphQLInt },
    materials: {
      type: new GraphQLList(ProjectMaterialType),
      resolve: resolvers.projectMaterials
    }
  })
});

const MaterialType = new GraphQLObjectType({
  name: 'Material',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLString },
    available: { type: GraphQLInt },
    metric: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    supplier: {
      type: SupplierType,
      resolve: resolvers.materialSupplier
    }
  })
});

const SupplierType = new GraphQLObjectType({
  name: 'Supplier',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    materials: {
      type: new GraphQLList(MaterialType),
      resolve: resolvers.supplierMaterials
    }
  })
});

module.exports = {
  ClientType,
  ProjectMaterialType,
  ProjectType,
  MaterialType,
  SupplierType
};
