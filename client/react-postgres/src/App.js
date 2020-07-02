import React, { useState, useEffect } from 'react';
import "./App.css"
import MainComp from "./MainComp.js"
import QueryTable from "./QueryTable.js"
import Header from './Header'
import {
  BrowserRouter,
 
  Route

} from "react-router-dom";


function App() {
return (
<BrowserRouter>
<Header/>
<MainComp/>
<div>
  <Route exact path="/search/:topicId" component={QueryTable} />
 
</div>
</BrowserRouter>
)


}

export default App;