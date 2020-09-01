var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();
const formidableMiddleware = require('express-formidable');
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const stripe = require('stripe')('sk_test_V95rGJ9DQXQ7I0VdTEK6M47b00nXL51TTU'); // Add your Secret Key Here

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

const Event = require("./models/Event");
const Notification = require("./models/Notification");
const Availability = require("./models/Availability");
const User = require("./models/User");

const auth = require('./routes/auth');
const users = require('./routes/users');
const events = require('./routes/events');
const notifications = require('./routes/notifications');
const availabilities = require('./routes/availabilities');

const adminBro = new AdminBro({
  resources: [Event, User, Notification, Availability],
  rootPath: '/admin',
})
const router = AdminBroExpressjs.buildRouter(adminBro)

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    useFindAndModify: false,
  })
  .then( () => console.log(`Connected to database`))
  .catch( (err) => console.error(err));

var app = express();

// CORS MIDDLEWARE SETUP
app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN, 'http://localhost:3000'],
  }),
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Build and use a router which will handle all AdminBro routes

// app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/users', users);
app.use('/events', events);
app.use('/notifications', notifications);
app.use('/availabilities', availabilities);

app.use(adminBro.options.rootPath, router)
app.use(formidableMiddleware());

// ERROR HANDLING
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;
