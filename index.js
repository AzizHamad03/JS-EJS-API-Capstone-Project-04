import express from 'express';
import axios from "axios";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const apiKey = process.env.apiKey;
const API_URL = "https://api.weatherbit.io/v2.0/current?";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
}
);
app.post('/', (req, res) => {
    res.redirect('/');
}
);
app.post("/cityWeather", async (req, res)=>{
    console.log(req.body.city);
    try {
        const result = await axios.get(API_URL + "city=" + req.body.city+"&key="+apiKey);
        const weatherData= result.data.data[0];
        console.log(weatherData);
        res.render("cityWeather.ejs",{
            data:weatherData,
        });
      } catch (error) {
        console.log("Catch error");
      }
});
app.listen(port, () => {
    console.log(`Listening to Port ${port}.`);
});
