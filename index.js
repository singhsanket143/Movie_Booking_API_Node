const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const MovieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');

env.config();
const app = express(); // express app object

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MovieRoutes(app); // invoking movie routes
theatreRoutes(app); // involing theatre routes

app.get('/home', (req, res) => {
    console.log("Hitting /home");
    return res.json({
        success: true,
        message: 'Fetched home'
    });
});

app.listen(process.env.PORT, async () => {
    // this callback gets execcuted, once we successfully start the server on the given port
    console.log(`Server started on Port ${process.env.PORT} !!`);

    try {
        await mongoose.connect(process.env.DB_URL); // connected to the mongo server
        console.log("Successfully connected to mongo");
        // await Movie.create({
        //     name: "Bacchan Pandey",
        //     description: "Comedy masala movie",
        //     casts: ["Akshay Kumar", "Kriti Sanon", "Jaqueline Fernandiz"],
        //     director: "Farhad Samji",
        //     trailerUrl: "http://bacchanpandey/trailers/1",
        //     language: "Hindi",
        //     releaseDate: "18-03-2022",
        //     releaseStatus: "RELEASED"
        // });

    } catch (err) {
        console.log("Not able to connect mongo", err);
    }
});