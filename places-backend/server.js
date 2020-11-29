const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');

const DBurl = 'mongodb+srv://admin:jLAZ0nE03mkqOLYF@cluster0.erd12.mongodb.net/PlacesDB?retryWrites=true&w=majority';


//app configs
const app = express();



//Middleware
app.use(bodyParser.json());

app.use('/api/places',placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res,next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred'});
});

//DB configs


//API Routes


// Listener
mongoose
    .connect(DBurl)
    .then(()=>{
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
