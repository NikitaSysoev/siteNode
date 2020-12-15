const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const routes = require('./routes');

// database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
  .on('error', (error) => console.log(error))
  .on('close', () => console.log('Database connection closed'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });
mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//express
const app = express();

// sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  }),
);

// sets and uses
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;
  res.render('index', {
    user: {id, login}
  });
});

app.use('/api/auth', routes.auth);

app.get('/blog', (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;
  res.render('blog', {
    user: {id, login}
  });
});

app.get('/contacts', (req, res) => {
  res.render('contacts');
});

// error 404
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});
/// error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {},
    title: 'Ooops....',
  });
});

app.listen(config.PORT, () =>
  console.log(`App listening at http://localhost:${config.PORT}`),
);
