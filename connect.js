var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '879574764',
  database : 'WEBSITE'
});

connection.connect();

connection.query('SELECT * FROM page', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].title);
});

connection.end();
