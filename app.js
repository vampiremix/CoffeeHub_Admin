'use strict'
let express = require('express');
let http = require('http');
let path = require('path');
let app = express();
let firebase = require("firebase");
var config = {
    apiKey: "AIzaSyDwZos6EDeCYliEN3P8ognprOZhG0OS2Ks",
    authDomain: "coffee-hub.firebaseapp.com",
    databaseURL: "https://coffee-hub.firebaseio.com",
    projectId: "coffee-hub",
    storageBucket: "coffee-hub.appspot.com",
    messagingSenderId: "985010208244"
  };
  firebase.initializeApp(config);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

let port = process.env.PORT || '3001';
app.set('port', port);

let server = http.createServer(app);
server.listen(port, () => {
    console.log('running : localhost:3001');
});
