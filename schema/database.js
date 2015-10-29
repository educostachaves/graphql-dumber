var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123system',
  database : 'test-widget'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");
} else {
    console.log("Error connecting database ... \n\n");
}
});

function User(id, name) {
  this.id = id;
  this.name = name;
}

function Widget(id, userId, name) {
  this.id = id;
  this.userId = userId;
  this.name = name;
}

var users = [];
var widgets = [];

connection.query('SELECT * FROM user', function(err, rows, fields) {
  if (!err) {
    for(var i = 0; i < rows.length; i++) {
      users.push( new User (rows[i].id , rows[i].name));
    }
  } else {
    console.log('Error while performing Query.');
  }
});

connection.query('SELECT * FROM widget', function(err, rows, fields) {
  if (!err) {
    for(var i = 0; i < rows.length; i++) {
      widgets.push( new Widget (rows[i].id , rows[i].userId , rows[i].name));
    }
  } else {
    console.log('Error while performing Query.');
  }
});

module.exports = {
  User: User,
  Widget: Widget,
  getUser: function(id) { return users.filter(function(u) { return u.id == id })[0] },
  getAnonymousUser: function() { return users[0] },
  getWidget: function(id) { return widgets.filter(function(w) { return w.id == id })[0] },
  getWidgetsByUser: function(userId) { return widgets.filter(function(w) { return w.userId == userId }) },
}
