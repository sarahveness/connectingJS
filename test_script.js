const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT * FROM famous_people WHERE id = $1::integer', [process.argv[2]], (err, results) => {
    if (err) return console.log(err);
    console.log(results.rows);
    client.end();
  });

});