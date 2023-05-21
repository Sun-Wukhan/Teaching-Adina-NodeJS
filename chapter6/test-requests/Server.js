const express = require('express');
const app = express();
const port = 3000; 

const myLogger = (req, res, next) => {
    console.log('LOGGED');
    next();
}

app.use(myLogger);

app.get('/', (req, res) => {
    res.send("<p> Navid <p/>");
}); 

app.post('/', function (req, res) {
    res.send('Sent a Post Request! Good Job Adina!')
})

app.put('/', function(req, res) {
    res.send('Send a Put Request, Good Job Adina!')
})

app.delete('/', function(req, res) {
    res.send('Sent a Delete Request, Good Job Adina!')
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})

app.use(myLogger);