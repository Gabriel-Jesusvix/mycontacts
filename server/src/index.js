const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandle = require('./app/middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use(cors)
app.use(routes);

app.use(errorHandle);


app.listen(3001, () => console.log('🔥 listening on port 3001'));
