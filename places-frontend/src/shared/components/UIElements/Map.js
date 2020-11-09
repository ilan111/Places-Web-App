import React, {useRef,useEffect,useState} from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './Map.css';

// const styles = {
//     width: "100vw",
//     height: "calc(100vh - 80px)",
//     position: "absolute"
//   };

function Map(props) {
    const [map, setMap] = useState(null);

    const mapRef=useRef(null);

    const {center,zoom}=props;

     useEffect(() => {
         //TODO: put the API key into .env file.
        mapboxgl.accessToken = 'pk.eyJ1IjoidGQxMDUiLCJhIjoiY2toOHlvcjZpMDNxbjJ1cGppanoyemEwYyJ9.nxXhwsYwG4hbcutLUPVPhg';
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
