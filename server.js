var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;

var app = express();

// View Engine. Modify this to get views out of specified folder?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder (where angular lives)
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', index);
app.use('/api', tasks);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});