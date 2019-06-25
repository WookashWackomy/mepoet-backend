const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');


const isDev = process.env.NODE_ENV !== 'production';
const PORT  = process.env.PORT || 4000;

// mongoose.connect(('mongodb://127.0.0.1:27017/mepoet', { useNewUrlParser: true }));
// const connection = mongoose.connection;
// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully");
// })
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;


const bodyParser = require('body-parser');
const cors = require('cors');
const mePoetRoutes = express.Router();

const axios = require('axios');
const URL = require('url');





const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/', mePoetRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);


var db = require('./database');




mePoetRoutes.route('/users').get(function(req, res) {
    db.User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

mePoetRoutes.route('/users/:id').get(function(req, res) {
    let id = req.params.id;
    db.User.findById(id,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

mePoetRoutes.route('/login').post(function(req, res) {
    //TODO
});

mePoetRoutes.route('/registerUser').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(todo => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

mePoetRoutes.route('/updateUser/:id').post(function(req, res) {
    db.User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("user has not been found");
        else
            user.name = req.body.name;
            //TODO poems & liked poems
            user.save().then(user => {
                res.json('User data updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


mePoetRoutes.route('/poems').get(function(req, res) {
    db.Poem.find(function(err, poems) {
        if (err) {
            console.log(err);
        } else {
            console.log("get poems from the database");
            res.json(poems);
        }
    });
});

mePoetRoutes.route('/poems:id').get(function(req, res) {
    let id = req.params.id;
    db.Poem.findById(id,function(err, poems) {
        if (err) {
            console.log(err);
        } else {
            res.json(poems);
        }
    });
});

mePoetRoutes.route('/addPoem').post(function(req, res) {
    let poem = new db.Poem(req.body);
    poem.save()
        .then(todo => {
            res.status(200).json({'poem': 'poem added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new poem failed');
        });
});

mePoetRoutes.route('/updatePoem/:id').post(function(req, res) {
    db.Poem.findById(req.params.id, function(err, poem) {
        if (!poem)
            res.status(404).send("poem has not been found");
        else
            poem.title = req.body.title;
            poem.body = req.body.body;
            poem.save().then(poem => {
                res.json('Poem updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

mePoetRoutes.route('/fetchPoemLine/:phrase').get(function(req,res){
    console.log(req.params);
    console.log(req.query);
    let phrase = "Latitude";
    let fetchedPoem = null;
    let url = "http://poetrydb.org/lines/";
    url = url + phrase;

    axios.get(url)
				.then(response => {
                        fetchedPoem = response.data[0].lines;
                        console.log(fetchedPoem);
                        res.send(fetchedPoem);
				})
				.catch(function (error) {
						console.log(error);
                });
})


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});