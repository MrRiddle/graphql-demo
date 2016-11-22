import express from 'express'
import bodyParser from 'body-parser'
import Bluebird from 'bluebird'
import mysql from 'mysql'
import config from './config'

/**
 * Services
 */
import getAllCustomers from './service/customers'

let app = express();
let {
    port,
    mysqlConfig
} = config;

app.use(bodyParser.text({
    type: 'application/graphql'
}));

var connection = mysql.createConnection(mysqlConfig);
connection.connect();
global.db = Bluebird.promisifyAll(connection);

app.get(...getAllCustomers);

app.listen(port, () => {
    console.log('GraphQL listening at http://localhost:%s', port);
});