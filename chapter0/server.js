const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Welcome to your first weather app")
// })

// app.get("/Toronto", (req, res) => {
//     const weather = {
//         temperature: 25, 
//         description: 'Cloud', 
//         location: 'Toronto',
//     };

//     res.json(weather)
// });

// app.get("/NewYork", (req, res) => {
//     const weather = {
//         temperature: 30, 
//         description: 'Sunny', 
//         location: 'New York',
//     };

//     res.json(weather)
// });

app.get('/weather/:city', async(req, res) => {
    try {
        const API_KEY = 'your_key_here';
        const CITY = req.params.city;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
    
        const response = await axios.get(API_URL);
        const weatherData = response.data;

        const weather = {
            temperature: weatherData.main.temp, 
            description: weatherData.weather[0].description, 
            location: weatherData.name,
        };

        res.json(weather);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something Went TERRIBLY WRONG'});
    }
});

app.listen(port, () => {
    console.log(`Port is running on: ${port}`)
});