import React, { useState, useEffect } from 'react';
import MapGL, { Marker, Popup } from '@urbica/react-map-gl';

import "./App.css"
import RenderPopup from "./RenderPopup.js"
import QueryTable from "./QueryTable.js"
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 15;








const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaXNlbmd1cHQ3ODE3IiwiYSI6ImNrYnp2M3k5NjBienkzMm4wbGc5dHQwcnYifQ.moA53jy-V5kicShIOtpxvQ'
function MainComp
() {
  const [popupInfo, setPopupInfo] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [hospitalLoc, setHospitalLoc] = useState([]);
  const [searchItems, setSearchItems] = useState(false);
  useEffect(() => {
    getHospitalLoc()
  }, []);
  const [viewport, setViewport] = useState({
    latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0

  });
  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0
  });

  const style = {
    width: '1px',
    height: '1px',
    color: '#fff',
    background: '#1978c8',
    borderRadius: '50%',
    textAlign: 'center'

  };

  const onDragEnd = (lngLat) => {
    setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  };

  function onClickHover(HospItem) {
     //console.log(HospItem)
     setPopupInfo(HospItem)


  }
 

  function getHospitalLoc() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setHospitalLoc(data.rows)
        setLoaded(true)
      })
  }

  function queryItems(searchItem) {
    fetch(`http://localhost:3001/merchants/${searchItem}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      setSearchItems(data)
    })
  }
  return (
    <div className="MainComp
    ">

      {loaded ?
        <MapGL
          style={{ width: '100%', height: '600px' }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          accessToken={MAPBOX_ACCESS_TOKEN}
  
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={setViewport}
        >


          {hospitalLoc.map((item) =>

            <Marker
              key={item.id}
              longitude={item.longitude}
              latitude={item.latitude}
              onDragEnd={onDragEnd}
              draggable="false"
       
              anchor="bottom"
            >
              <svg
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                  cursor: 'pointer',
                  fill: '#d00',
                  stroke: 'none',
                  transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onClick={() => onClickHover(item)}
              >
                <path d={ICON} />
              </svg>
            </Marker>





          )}

          
        <RenderPopup popupInfo = {popupInfo} onClickHover={onClickHover} queryItems = {queryItems}/>
        
  
      
        </MapGL>
        : 'There is no merchant data available'}
  
  
    </div>
  );
}

export default MainComp
;
