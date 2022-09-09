const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const MovieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

env.config();
const app = express(); // express app object

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('debug', true);

MovieRoutes(app); // invoking movie routes
theatreRoutes(app); // invoking theatre routes
authRoutes(app); // invoking auth routes
userRoutes(app); // invoking user routes

app.listen(process.env.PORT, async () => {
    // this callback gets execcuted, once we successfully start the server on the given port
    console.log(`Server started on Port ${process.env.PORT} !!`);

    try {
        await mongoose.connect(process.env.DB_URL); // connected to the mongo server
        console.log("Successfully connected to mongo");
    } catch (err) {
        console.log("Not able to connect mongo", err);
    }
});