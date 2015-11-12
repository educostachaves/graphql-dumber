var GraphQL = require('graphql')
var GraphQLRelay = require('graphql-relay')
var db = require('./database')


// Traduzindo um pouco do que entendi, Este é o Schema do GraphQL que contém
// todos os tipos, queries e motations que vamos usar no Sistema
// O relay adciona tipos especificos para funcionar como Node, Edge and Connection

// Pra começar é preciso criar o Nó no sistema, que será uma entidade: Um objeto com
// um ID.

// Pra criar essa interface, nos precisamos definir um Nó, passando um primeiro argumento
// de ID, que será um ID global do Relay. O Segundo argumento pode ser usado para resolver
// uma entidade de tipo do GraphQL. Isso é opcional, mas vamos deixar isso fora e usar
// o isTypeOf nos Tipos do GraphQl depois

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'StudyPlan') {
    return db.getStudyPlan(idInfo.id)
  } else if (idInfo.type == 'Module') {
    return db.getModule(idInfo.id)
  }
  return null
})

// Agora podemos usar a interface de tipo do GraphQl  para definir nosso Schema

var moduleType = new GraphQL.GraphQLObjectType({
  name: 'Module',
  description: 'A module',

  // Isso é para o Relay determinar um tipo especifico
  isTypeOf: function(obj) { return obj instanceof db.Module },

  // nós podemos declarar nossos campos como objetos
  fields: {
    id: GraphQLRelay.globalIdField('Module'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the module',
    },
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the module',
    },
    description: {
      type: GraphQL.GraphQLString,
      description: 'The description of the module',
    }
  },
  // Declaração de Typo, como um nó
  interfaces: [nodeDefinitions.nodeInterface],
})

var studyPlanType = new GraphQL.GraphQLObjectType({
  name: 'StudyPlan',
  description: 'A studyplan',
  isTypeOf: function(obj) { return obj instanceof db.StudyPlan },

  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('StudyPlan'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the studyplan',
      },
      description: {
        type: GraphQL.GraphQLString,
        description: 'The description of the studyplan',
      },
      urlTitle: {
        type: GraphQL.GraphQLString,
        description: 'The url title of the studyplan',
      },
      // Definição 1:N
      modules: {
        description: 'A studyplan\'s collection of modules',

        // Uma ajuda do Relay para a Conexão. Preciso entender isso melhor :P
        type: GraphQLRelay.connectionDefinitions({name: 'Module', nodeType: moduleType}).connectionType,
        args: GraphQLRelay.connectionArgs,

        // Podemos definir um resolve para qualquer campo
        // e podemos usar Promise caso seja asíncrono
        resolve: function(studyPlan, args) {
          // Isso monta uma conexão de objeto na sua array de dados
          // Se for assícrono, usando Promises usar connectionFromPromisedArray
          return GraphQLRelay.connectionFromArray(db.getModulesByStudyPlan(studyPlan.id), args)
        },
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
})

// Até aqui rolou bem. Definições dos nossos tipos, e configuração dos Nós do Relay.
// Agora é exportar nosso Schema
// GraphQL espera queries e mutations (o que não temos por enquanto aqui. :P)

module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      // O relay vai precisar disto para chamar os nós usando as IDs globais
      node: nodeDefinitions.nodeField,
      // Nossos campos seguem abaixo
      studyplan: {
        type: studyPlanType,
        resolve: function() { return db.getStudyPlan(1) },
        // No caso defini pegar apenas uma Disciplina, porque ainda não sei ainda como pegar todas :S
      },
    },
  }),
})
