import React, { useState, useEffect } from 'react';
import MapGL, { Marker, Popup,  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl } from '@urbica/react-map-gl';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    
    NavLink,
    withRouter
  } from "react-router-dom";
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css';

function RenderPopup(props) {
    const popupInfo = props.popupInfo
    const urlLink = '/search/' + popupInfo.hospital
console.log(popupInfo)
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => props.onClickHover(false)}
        >
          <div className="popup-item">
          <div> {popupInfo.hospital}</div>
          <NavLink to = {urlLink} className="grey-color">See Table</NavLink>
          </div>
        </Popup>
      )
    );
  }

  export default withRouter(RenderPopup)