var express = require('express')
var graphqlHttp = require('express-graphql')
var schema = require('./schema/schema')

// Configuração do Express Bem básico, sem muita coisa.
var app = express()

// Coloquei o GraphiQL para me ajudaar no retorno dos dados.
// Foi a forma mais fácil de ver quais problemas estava surgindo.
app.use('/graphql', graphqlHttp({schema: schema,graphiql: true}))

// Essas rotas são para servir as paginas estáticas... nada demais.
app.use('/relay', express.static('./node_modules/react-relay/dist'))
app.use('/', express.static('./public'))

app.listen(3000, function() { console.log('Listening on 3000...') })
