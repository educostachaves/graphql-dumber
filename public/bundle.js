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

// A simple top-level component that illustrates how to render Relay-fetched
// data using props. In this case Relay will populate a `user` property that
// has a collection of `widgets` based on the queries and fragments we give it
// further below.

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
  }

  // The component we need to export is a Relay wrapper around our App component
  // from above. It declares the GraphQL fragments where we list the properties
  // we want to be fetched – eg, user.name, user.widgets.edges, etc

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'StudyPlan: ',
          this.props.studyplan.name
        ),
        React.createElement(
          'h2',
          null,
          'Modules:'
        ),
        React.createElement(
          'ul',
          null,
          this.props.studyplan.modules.edges.map(function (edge) {
            return React.createElement(
              'li',
              { key: edge.node.id },
              edge.node.name,
              ' (Global ID: ',
              edge.node.id,
              ')'
            );
          })
        )
      );
    }
  }]);

  return App;
})(React.Component);

exports.Container = Relay.createContainer(App, {
  fragments: {
    // The property name here reflects what is added to `this.props` above.
    // This template string will be parsed by babel-relay-plugin when we browserify.
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

// The Relay root container needs to know what queries will occur at the top
// level – these configurations are currently called Routes in Relay, but this
// name is misleading and under review so we don't use it here.
exports.queries = {
  name: 'AppQueries', // can be anything, just used as an identifier
  params: {},
  queries: {
    // We can use this shorthand so long as the component we pair this with has
    // a fragment named "user", as we do above.
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
/* In schema/schema.js we define a Connection between users and widgets */ /* Connections use `edges` and `node` to hold paging info and child items */

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
/* eslint-env es6 */
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var Relay = (typeof window !== "undefined" ? window['Relay'] : typeof global !== "undefined" ? global['Relay'] : null);
var App = require('./App');

// This file is the entry point on the browser – browserify will compile it, as
// well as App.js and any other client-side dependencies and create
// public/bundle.js which will be requested by public/index.html

ReactDOM.render(
// At the top of a Relay tree is the root container, which we pass our
// wrapped App component to, as well as the query configuration ("route"). If
// we need to render a different component, say as a result of a navigation
// event, then we would update it here.
// We also illustrate the use of the onReadyStateChange handler in case
// there's a network error, etc
React.createElement(Relay.RootContainer, { Component: App.Container, route: App.queries,
  onReadyStateChange: function (_ref) {
    var error = _ref.error;
    if (error) console.error(error);
  } }), document.getElementById('content'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./App":1}]},{},[2]);
