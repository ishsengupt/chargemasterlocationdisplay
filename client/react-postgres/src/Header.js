import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { render } from "react-dom";

function Header() {


  return (
    <div className="header">
      <div className="flex__row padding-header">
    

        <NavLink to="/" className="frame__demos header-margin">
            home
        </NavLink>

        <NavLink to="/create" className="frame__demos header-margin">
            create
        </NavLink>

        <NavLink to="/query" className="frame__demos header-margin">
          query
        </NavLink>
   
      </div>
   
    </div>
  );
}

export default withRouter(Header);