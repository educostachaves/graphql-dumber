/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')


// Agora renderizo a pagina usando React. Crio um novo componente, e recebo os
// dados como Props. No caso o relay vai popular uma disciplina e todos os
// modulos relacionados a essa disciplina, baseado no fragmento que construimos
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>StudyPlan: {this.props.studyplan.name}</h2>
        <h2>Modules:</h2>
        <ul>
            {this.props.studyplan.modules.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.name} (Global ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    )
  }
}

// Uma questão que não entendi muito bem nesses exempli é o porque dele precisar dropdown-messages
// componentes Node e Edges para lista. Preciso ver melhor essa questão, que ainda esta meio nebuloso

// Agora declaramos nosso Fragmento, para renderizar apenas o que queremos na tela.

exports.Container = Relay.createContainer(App, {
  fragments: {
    // o nome nessa propriedade é que vai definir nossa props
    // Vamos transformar isso lá no babel-relay-plugin quando rodar o browserify.
    studyplan: () => Relay.QL`
      fragment on StudyPlan {
        name,
        modules(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
})

// Agora o relay precisa saber quais queries ele vai rodar na Route. É o que definimos aqui
exports.queries = {
  name: 'AppQueries', // Pode ser qualquer coisa.
  params: {},
  queries: {
    // Podemos usar essa nomeclatura, prara equivaler com o
    // fragmento que fizemos acima.
    studyplan: () => Relay.QL`query { studyplan }`,
  },
}
