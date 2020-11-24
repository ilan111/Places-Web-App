const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

//app configs
const app = express();



//Middleware
app.use(bodyParser.json());

app.use('/api/places',placesRoutes);

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
app.listen(5000);