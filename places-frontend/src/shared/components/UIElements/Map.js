import React, {useRef,useEffect,useState} from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './Map.css';

function Map(props) {
    const [map, setMap] = useState(null);

    const mapRef=useRef(null);

    const {center,zoom}=props;

     useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
        const initializeMap = ({ setMap, mapRef }) => {
          const map = new mapboxgl.Map({
            container: mapRef.current,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: center,
            zoom: zoom
          });

          map.on("load", () => {
            setMap(map);
            map.resize();
          });

          const marker = new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(map);

        map.addControl(new mapboxgl.NavigationControl());

        map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('map')}));
        };

        if (!map) initializeMap({ setMap, mapRef });

    //   new window.mapboxgl.Marker({position: center , map: map});
    },[center,zoom]);

    return (
        <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
            
        </div>
    );
}

export default Map
