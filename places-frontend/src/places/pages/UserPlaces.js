import React from 'react';
import PlaceList from '../components/PlaceList';
import {useParams} from 'react-router-dom';

const DUMMY_PLACES=[
    {
        id:'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skt scrapers in the world',
        imageUrl: 'https://imgs.6sqft.com/wp-content/uploads/2020/04/27130215/Empire-State-Building-dusk-e1588006976579.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id:'p2',
        title: 'Empire State Building',
        description: 'One of the most famous skt scrapers in the world',
        imageUrl: 'https://imgs.6sqft.com/wp-content/uploads/2020/04/27130215/Empire-State-Building-dusk-e1588006976579.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    },
]

function UserPlaces() {
    const userId=useParams().userId;
    const loadedPlaces=DUMMY_PLACES.filter(place =>place.creator===userId);
    return (
        <PlaceList items={loadedPlaces}/>
    )
}

export default UserPlaces
