import React from 'react';
import {useParams} from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';

import './PlaceForm.css';

const DUMMY_PLACES=[
    {
        id:'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skt scrapers in the world',
        imageUrl: 'https://imgs.6sqft.com/wp-content/uploads/2020/04/27130215/Empire-State-Building-dusk-e1588006976579.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: [ -73.9878584,40.7484405], //[lng,lat]
        creator: 'u1'
    },
    {
        id:'p2',
        title: 'Empire State Building',
        description: 'One of the most famous skt scrapers in the world',
        imageUrl: 'https://imgs.6sqft.com/wp-content/uploads/2020/04/27130215/Empire-State-Building-dusk-e1588006976579.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: [ -73.9878584,40.7484405],
        creator: 'u2'
    },
]

function UpdatePlace() {
    const placeId= useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p=> p.id === placeId);

    if(!identifiedPlace){
        return <div className="center">
            <h2>Could not find place!</h2>
        </div>
    }

    return (
        <form className="place-form">
            <Input 
                id="title" 
                element="input" 
                type="text"
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={()=> {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input 
                id="description" 
                element="textarea" 
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)."
                onInput={()=> {}}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                UPDATE PLACE
            </Button>
        </form>
    )
}

export default UpdatePlace
