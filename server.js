const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// parse app(json)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// call ruotes
const routes = require('./routes');
routes(app);

// register menu routes di middleware
app.use('/auth', require('./middleware'));


app.listen(4000, () => {
    console.log(`Server started on port`);
});