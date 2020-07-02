import React, { useState, useEffect } from 'react';
import MapGL, { Marker, Popup,  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl } from '@urbica/react-map-gl';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  import { Tabs, Tab, Content } from "./tab";
  import { Tabs2, Tab2, Content2 } from "./tab2";
  import "./App.css"

import 'mapbox-gl/dist/mapbox-gl.css';

export default function QueryTable(props) {
  let { topicId } = useParams();
  console.log(topicId)
  const [searchItems, setSearchItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);
  const [active2, setActive2] = useState(0);
  const handleClick = e => {
    console.log(e.target.id)
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  const handleClick2 = e => {
    console.log(e.target.id)
    const index = parseInt(e.target.id, 0);
    console.log(active2)
    if (index !== active2) {

      setActive2(index);
    }
  };
  useEffect(() => {
    console.log(props.match.params.topicId)
    getHospitalInfo(topicId)
  }, [props.match.params.topicId]);


  function getHospitalInfo(searchItem) {
    fetch(`http://localhost:3001/merchants/${searchItem}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      if (data.length < 1) {
        console.log("no change")
      }
      setSearchItems(data)
      setLoaded(true)
    })
  }
 
    return (
       
        <div className="full-table">
          <div className="header-title"> {topicId}</div>
            {loaded ?
        <div>

<div className="query-head grey-back">
<div className="query-head__item">ID</div>
<div className="query-head__item">

<Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Description
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
         Procedure
        </Tab>

        <Tab onClick={handleClick} active={active === 2} id={2}>
         Comments
        </Tab>

    
      </Tabs>
</div>
<div className="query-head__item">
<Tabs2>
<Tab2 onClick={handleClick2} active={active2 === 0} id={0}>
         Price
        </Tab2>

        <Tab2 onClick={handleClick2} active={active2 === 1} id={1}>
         Inpatient
        </Tab2>

        <Tab2 onClick={handleClick2} active={active2 === 2} id={2}>
         Outpatient
        </Tab2>

        <Tab2 onClick={handleClick2} active={active2 === 3} id={3}>
        Rate
        </Tab2>

        <Tab2 onClick={handleClick2} active={active2 === 4} id={4}>
      Revenue
        </Tab2>

        <Tab2 onClick={handleClick2} active={active2 === 5} id={5}>
        Average Charge
        </Tab2>

        <Tab2 onClick={handleClick2} active={active2 === 6} id={6}>
      Charge Quantity
        </Tab2>
        </Tabs2>
</div>

<div className="query-head__item">Year</div>

</div>
          {searchItems.map((item) =>

<div className="query-head" key={item.id}>
<div className="query-body">{item.cdmapp}</div>
<div className="query-body">
<Content active={active === 0}>
          <div> {item.descriptionapp}</div>
        </Content>

        <Content active={active === 1}>
          <div> {item.proc}</div>
        </Content>

        <Content active={active === 2}>
          <div> {item.commentscont}</div>
        </Content>
 
</div>
<div className="query-body">
  
<Content2 active={active2 === 0}>
          <div> {item.priceapp}</div>
        </Content2>

        <Content2 active={active2 === 1}>
          <div> {item.inpatientapp}</div>
        </Content2>

        <Content2 active={active2 === 2}>
          <div> {item.outpatientapp}</div>
        </Content2>

        <Content2 active={active2 === 3}>
          <div> {item.rate}</div>
        </Content2>

        <Content2 active={active2 === 4}>
          <div> {item.revenue}</div>
        </Content2>

        <Content2 active={active2 === 5}>
          <div> {item.average_charge}</div>
        </Content2>

        <Content2 active={active2 === 6}>
          <div> {item.charge_quantity}</div>
        </Content2>
  
 </div>

<div className="query-body">{item.yeardate}</div>

</div>       





          )}

          
       
        
  
      
        </div>
        : 'No queries loaded'}
  
        </div>
      
    );
  }