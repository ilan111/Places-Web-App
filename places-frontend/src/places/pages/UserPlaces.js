import React, {useEffect, useState} from 'react';
import PlaceList from '../components/PlaceList';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// const DUMMY_PLACES=[
//     {
//         id:'p1',
//         title: 'Empire State Building',
//         description: 'One of the most famous skt scrapers in the world',
//         imageUrl: 'https://imgs.6sqft.com/wp-content/uploads/2020/04/27130215/Empire-State-Building-dusk-e1588006976579.jpg',
//         address: '20 W 34th St, New York, NY 10001',
//         location: [ -73.9878584,40.7484405], //[lng,lat]
//         creator: 'u1'
//     },
//     {
//         id:'p2',
//         title: 'Empire State Building',
//         description: 'One of the most famous skt scrapers in the world',
//         imageUrl: 'https://imgs.6sqft.com/wp-content/uploads/2020/04/27130215/Empire-State-Building-dusk-e1588006976579.jpg',
//         address: '20 W 34th St, New York, NY 10001',
//         location: [ -73.9878584,40.7484405],
//         creator: 'u2'
//     },
// ]

function UserPlaces() {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error,sendRequest, clearError} = useHttpClient();
    const userId=useParams().userId;

    useEffect( () => {
      const fetchPlaces = async ()=>{
          try{
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`); 
            setLoadedPlaces(responseData.places);
          } catch(err){}
      };
      fetchPlaces();
    },[sendRequest, userId]);

    const placeDeletedHandler = (deletedPlace)=>{
        setLoadedPlaces(
            prevPlaces => prevPlaces.filter(place => place.id !== deletedPlace)
        );
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading &&
                <div className="center">
                     <LoadingSpinner asOverlay/>                   
                </div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
        </React.Fragment>
    )
}

export default UserPlaces
