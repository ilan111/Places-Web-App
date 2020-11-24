const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
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

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(p =>{
        return p.id === placeId;
    })

    if (!place) {
       // option 1 to handle an error: 
       const error = new Error ('Could not find a place for the provided id.');
       error.code = 404;
       throw error; 
    }

    res.json({place}); // {place} => {place: place}
});

router.get('/user/:uid',(req,res, next)=>{
    const userId = req.params.uid;
    
    const place = DUMMY_PLACES.find( p => {
        return p.creator === userId;
    });

    if (!place) {
        //option 2 to handle an error:
        const error = new Error ('Could not find a place for the provided user id.');
        error.code = 404;
        return next(error);  
       }

    res.json({place}); // {place} => {place: place}
});

module.exports = router;