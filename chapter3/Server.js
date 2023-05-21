const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send('Hello Adina');
})

app.listen(3000, function() {
    console.log('Adina is listening on Port 3000!')
})

const logger = function(req, res) {
    console.log("Logging Details"); 
    next()
};

app.use(logger);