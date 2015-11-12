(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* eslint-env es6 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Relay = (typeof window !== "undefined" ? window['Relay'] : typeof global !== "undefined" ? global['Relay'] : null);

// Agora renderizo a pagina usando React. Crio um novo componente, e recebo os
// dados como Props. No caso o relay vai popular uma disciplina e todos os
// modulos relacionados a essa disciplina, baseado no fragmento que construimos

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
  }

  // Uma questão que não entendi muito bem nesses exempli é o porque dele precisar dropdown-messages
  // componentes Node e Edges para lista. Preciso ver melhor essa questão, que ainda esta meio nebuloso

  // Agora declaramos nosso Fragmento, para renderizar apenas o que queremos na tela.

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            null,
            this.props.studyplan.name,
            React.createElement(
              'ul',
              null,
              this.props.studyplan.modules.edges.map(function (edge) {
                return React.createElement(
                  'li',
                  { key: edge.node.id },
                  edge.node.name
                );
              })
            )
          )
        )
      );
    }
  }]);

  return App;
})(React.Component);

exports.Container = Relay.createContainer(App, {
  fragments: {
    // o nome nessa propriedade é que vai definir nossa props
    // Vamos transformar isso lá no babel-relay-plugin quando rodar o browserify.
    studyplan: function studyplan() {
      return (function () {
        var GraphQL = Relay.QL.__GraphQL;
        return new GraphQL.QueryFragment('App', 'StudyPlan', [new GraphQL.Field('name', null, null, null, null, null, {
          parentType: 'StudyPlan'
        }), new GraphQL.Field('modules', [new GraphQL.Field('edges', [new GraphQL.Field('node', [new GraphQL.Field('id', null, null, null, null, null, {
          parentType: 'Module',
          requisite: true
        }), new GraphQL.Field('name', null, null, null, null, null, {
          parentType: 'Module'
        })], null, null, null, null, {
          parentType: 'ModuleEdge',
          rootCall: 'node',
          pk: 'id',
          requisite: true
        }), new GraphQL.Field('cursor', null, null, null, null, null, {
          parentType: 'ModuleEdge',
          generated: true,
          requisite: true
        })], null, null, null, null, {
          parentType: 'ModuleConnection',
          plural: true
        }), new GraphQL.Field('pageInfo', [new GraphQL.Field('hasNextPage', null, null, null, null, null, {
          parentType: 'PageInfo',
          generated: true,
          requisite: true
        }), new GraphQL.Field('hasPreviousPage', null, null, null, null, null, {
          parentType: 'PageInfo',
          generated: true,
          requisite: true
        })], null, null, null, null, {
          parentType: 'ModuleConnection',
          generated: true,
          requisite: true
        })], null, [new GraphQL.Callv('first', new GraphQL.CallValue(10))], null, null, {
          parentType: 'StudyPlan',
          connection: true,
          nonFindable: true
        }), new GraphQL.Field('id', null, null, null, null, null, {
          parentType: 'StudyPlan',
          generated: true,
          requisite: true
        })]);
      })();
    }
  }
});

// Agora o relay precisa saber quais queries ele vai rodar na Route. É o que definimos aqui
exports.queries = {
  name: 'AppQueries', // Pode ser qualquer coisa.
  params: {},
  queries: {
    // Podemos usar essa nomeclatura, prara equivaler com o
    // fragmento que fizemos acima.
    studyplan: function studyplan() {
      return (function () {
        var GraphQL = Relay.QL.__GraphQL;
        return new GraphQL.Query('studyplan', null, [new GraphQL.Field('id', null, null, null, null, null, {
          parentType: 'StudyPlan',
          generated: true,
          requisite: true
        })], null, null, 'App');
      })();
    }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
/* eslint-env es6 */
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var Relay = (typeof window !== "undefined" ? window['Relay'] : typeof global !== "undefined" ? global['Relay'] : null);
var App = require('./App');

// Aquie é onde o browser vai renderizar a saida de dados, compliado pelo Browserify.

ReactDOM.render(
// No topo da aplicação Relay temos um Container, onde passamos nosso componente react
// e també passamos nossa consultas, as rotas. Se precisamos tornar um componente
// diferente, digamos, como resultado de um evento de navegação, então teríamos atualizá-lo
// aqui. Utilizei o manipulador onReadyStateChange no caso de haver um erro de rede, etc.
React.createElement(Relay.RootContainer, { Component: App.Container, route: App.queries,
  onReadyStateChange: function (_ref) {
    var error = _ref.error;
    if (error) console.error(error);
  } }), document.getElementById('content'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./App":1}]},{},[2]);
