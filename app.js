const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./db');
const routes = require('./routes/router')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



const swaggerDefinition = {
  info: {
    title: 'Test Development', 
    version: '1.0.0',
    description: 'A sample API', 
  },
  host: "localhost:3000",
  basePath: '/', 
};

const options = {
  swaggerDefinition: swaggerDefinition,
  explorer: true,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes)

app.get('/', (req, res) => res.send('Hello World'))

db.on('connected', () => console.log('successfully connected to db!'));
app.listen(port, ()=> console.log('port is running successfully'))

module.exports = app;