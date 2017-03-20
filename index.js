const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to mongoose
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database', config.database);
})

mongoose.connection.on('error', () => {
  console.log('Database error', err);
})

const routesApi = require('./routes/api');
const routesUsers = require('./routes/users');

const port = process.env.PORT || 3000;

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport);

app.use('/api', routesApi);
app.use('/users', routesUsers);

// Any other routes is redirected to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, (req, res) => {
  console.log('listening on port ', port);
})
