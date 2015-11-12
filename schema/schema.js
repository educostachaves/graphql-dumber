var GraphQL = require('graphql')
var GraphQLRelay = require('graphql-relay')
var db = require('./database')

// This module exports a GraphQL Schema, which is a declaration of all the
// types, queries and mutations we'll use in our system.

// Relay adds some specific types that it needs to function, including Node, Edge, Connection

// Firstly we need to create the Node interface in our system. This has nothing
// to do with Node.js! In Relay, Node refers to an entity – that is, an object
// with an ID.

// To create this interface, we need to pass in a resolving function as the
// first arg to nodeDefinitions that can fetch an entity given a global Relay
// ID. The second arg can be used to resolve an entity into a GraphQL type –
// but it's actually optional, so we'll leave it out and use isTypeOf on the
// GraphQL types further below.

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'StudyPlan') {
    return db.getStudyPlan(idInfo.id)
  } else if (idInfo.type == 'Module') {
    return db.getModule(idInfo.id)
  }
  return null
})

// We can now use the Node interface in the GraphQL types of our schema

var moduleType = new GraphQL.GraphQLObjectType({
  name: 'Module',
  description: 'A shiny module',

  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) { return obj instanceof db.Module },

  // We can either declare our fields as an object of name-to-definition
  // mappings or a closure that returns said object (see userType below)
  fields: {
    id: GraphQLRelay.globalIdField('Module'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the module',
    },
  },
  // This declares this GraphQL type as a Node
  interfaces: [nodeDefinitions.nodeInterface],
})

var studyPlanType = new GraphQL.GraphQLObjectType({
  name: 'StudyPlan',
  description: 'A studyplan',
  isTypeOf: function(obj) { return obj instanceof db.StudyPlan },

  // We use a closure here because we need to refer to widgetType from above
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('StudyPlan'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the studyplan',
      },
      // Here we set up a paged one-to-many relationship ("Connection")
      modules: {
        description: 'A studyplan\'s collection of modules',

        // Relay gives us helper functions to define the Connection and its args
        type: GraphQLRelay.connectionDefinitions({name: 'Module', nodeType: moduleType}).connectionType,
        args: GraphQLRelay.connectionArgs,

        // You can define a resolving function for any field.
        // It can also return a promise if you need async data fetching
        resolve: function(studyPlan, args) {
          // This wraps a Connection object around your data array
          // Use connectionFromPromisedArray if you return a promise instead
          return GraphQLRelay.connectionFromArray(db.getModulesByStudyPlan(studyPlan.id), args)
        },
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
})

// Now we can bundle our types up and export a schema
// GraphQL expects a set of top-level queries and optional mutations (we have
// none in this simple example so we leave the mutation field out)
module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      // Relay needs this to query Nodes using global IDs
      node: nodeDefinitions.nodeField,
      // Our own root query field(s) go here
      studyplan: {
        type: studyPlanType,
        resolve: function() { return db.getMathStudyPlan() },
      },
    },
  }),
})
