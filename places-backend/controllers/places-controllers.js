const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location:{
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY, 1001',
        creator: 'u1'
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(p =>{
        return p.id === placeId;
    })

    if (!place) {
        // option 1 to handle an error: 
    //    const error = new Error ('Could not find a place for the provided id.');
    //    error.code = 404;
    //    throw error; 

        throw new HttpError('Could not find a place for the provided id.', 404);
    }

    res.json({place}); // {place} => {place: place}
};

const getPlacesByUserId = (req,res, next)=>{
    const userId = req.params.uid;
    
    const places = DUMMY_PLACES.filter( p => {
        return p.creator === userId;
    });

    if (!places || places.length === 0) {
        //option 2 to handle an error:
        // const error = new Error ('Could not find a places for the provided user id.');
        // error.code = 404;
        // return next(error);  
        return next(
             new HttpError('Could not find a places for the provided user id.', 404)
        );
       }

    res.json({places}); // {place} => {place: place}
};

const createPlace = async (req, res ,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next (new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address, creator } = req.body;
   
    let coordinates;
    try{
         coordinates = await getCoordsForAddress(address);
    } catch(error){
      return next(error);
    }
   
    //const title = req.body.title
    const createdPlace = new Place({
        title,
        description,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/5a/a3/azrieli-center.jpg',
        address,
        location: {lat: coordinates[0], lng: coordinates[1]},
        creator
    });

    try{
        await createdPlace.save();
    } catch{
        const error = new HttpError('Creating place failed, please try again.', 500)
        return next(error);
    }

    res.status(201).json({place: createdPlace});
}

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check your data.', 422)
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;
    
    const updatedPlace ={ ...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
       throw new HttpError('Could not find a place for that id.', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted place.'})
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;