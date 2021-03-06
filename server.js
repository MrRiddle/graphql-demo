import express from 'express'
import bodyParser from 'body-parser'
import Bluebird from 'bluebird'
import mysql from 'mysql'
import config from './config'

/**
 * Services
 */
import customers from './service/customers'
import employees from './service/employees'

let app = express();
let {
    port,
    mysqlConfig
} = config;

app.use(express.static('public'));
app.use(bodyParser());
app.use(bodyParser.text({
    type: 'application/graphql'
}));

var connection = mysql.createConnection(mysqlConfig);
connection.connect();
global.db = Bluebird.promisifyAll(connection);

app.post(...customers);
app.post(...employees);

app.listen(port, () => {
    console.log('GraphQL listening at http://localhost:%s', port);
});