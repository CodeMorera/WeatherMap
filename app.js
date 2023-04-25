const express = require('express');
const https = require('node:https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
       
});

app.post('/', (req,res)=>{
    const query = req.body.cityName
    const apiKey = 'afed2601b8779313aac5211eab0c7e35'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='
    const unit = 'imperial'
    const urlMap = url+ query +'&appid=' + apiKey + '&units=' + unit

    https.get(urlMap,(response)=>{
        console.log(response.statusCode);

        response.on('data',(d)=>{
            const weatherData = JSON.parse(d)
            const temp = weatherData.main.temp
            const descript = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = 'https://openweathermap.org/img/wn/' + icon +'@2x.png'
            
            res.write('<p>The weather is currently '+ descript + '</p>')
            res.write('<h1>The temperature in '+query+' is ' + temp +' F</h1>')
            res.write("<img src=" + imageURL + ">")
            res.send()
    });
});
})



app.listen(3000,()=> {
    console.log("server is running on port 3000.")
})