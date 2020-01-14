const express = require('express');
const app = express();
const mysql_creds = require('./mysql_creds');
const mysql = require('mysql');
const db = mysql.createConnection(mysql_creds);
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '25mb'}));
app.use(express.json());
app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//  GET route to show the backend is hooked up
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

require('./addAccount')(app, db);
require('./loginUser')(app, db);
require('./getUsername')(app, db);
require('./getUserStats')(app, db);
require('./getUserMedia')(app, db);
require('./getLandingMedia')(app, db);
require('./createComment')(app, db);
require('./likeMedia')(app, db);
require('./unfollowUser')(app, db);
require('./getStoriesProfile')(app, db);
require('./getStoriesMedia')(app, db);
require('./updateViewedStories')(app, db);
require('./suggestedFollows.js')(app, db);
require('./exploreMedia.js')(app, db);
require('./singlePostInfo.js')(app, db);
require('./getNotifications')(app,db);
require('./getFollowerUsername')(app, db);
