/* eslint-env es6 */
var React = require('react')
var ReactDOM = require('react-dom')
var Relay = require('react-relay')
var App = require('./App')

// Aquie é onde o browser vai renderizar a saida de dados, compliado pelo Browserify.

ReactDOM.render(
  // No topo da aplicação Relay temos um Container, onde passamos nosso componente react
  // e també passamos nossa consultas, as rotas. Se precisamos tornar um componente
  // diferente, digamos, como resultado de um evento de navegação, então teríamos atualizá-lo
  // aqui. Utilizei o manipulador onReadyStateChange no caso de haver um erro de rede, etc.
  <Relay.RootContainer Component={App.Container} route={App.queries}
    onReadyStateChange={({error}) => { if (error) console.error(error) }} />,

  document.getElementById('content')
)
