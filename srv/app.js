var express = require('express');
var http = require('http');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var auth = require('./routes/auth');
var posts = require('./routes/posts');
var profiles = require('./routes/profiles');
var transferts = require('./routes/transferts');
var agences = require('./routes/agences');
var clients = require('./routes/clients');
var pays = require('./routes/pays');
var operateurs = require('./routes/operateurs');
var session = require('./session');
var path = require('path');
var config   = require('./config/database');



var app = express();

app.set('port', process.env.PORT || 4300);

//Connect Database
mongoose.connect(config.url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));
app.use('/bower_components',  express.static('bower_components'));
app.get('/', function(req,res) {
  res.sendFile('index.html', {'root': 'dist/'});
});
session.configure();
auth.configure(app);
//app.all('*', session.ensureAuthenticated);
posts.configure(app);
profiles.configure(app);
transferts.configure(app);
clients.configure(app);
agences.configure(app);
pays.configure(app);
operateurs.configure(app);
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
