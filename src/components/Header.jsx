import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import LoggedInNavBar from "./LoggedInNavBar";
import Login from "./Login";

function Header({ loggedIn, setErrorMsg, setLoggedIn, roles }) {
  return (
    <nav className="topnav">
      <NavLink className="active" to="/">
        <i className="fa fa-fw fa-home" /> Home
      </NavLink>

      {loggedIn && roles.includes("admin") && (
        <NavLink to="/users">
          <i className="fa fa-fw fa-search" /> Users
        </NavLink>
      )}

      {loggedIn && roles.includes("admin") && (
        <NavLink to="/tenants">
          <i className="fa fas fa-users" /> Tenants
        </NavLink>
      )}

      {loggedIn && roles.includes("admin") && (
        <NavLink to="/rentals">
          <i className="fa fas fa-archive" /> Rentals
        </NavLink>
      )}

      {loggedIn && roles.includes("user") && (
        <NavLink to="/user-rentals">
          <i className="fa fas fa-archive" /> Rentals
        </NavLink>
      )}

      <NavLink to="/contact">
        <i className="fa fa-fw fa-envelope" /> Contact
      </NavLink>

      {loggedIn && roles.includes("admin") && (
        <NavLink to="/simple-users">
          <i className="fa fa-fw fa-user" /> Simple Users
        </NavLink>
      )}

      {loggedIn && (
        <NavLink to="profile">
          <i className="fa fa-fw fa-id-badge" /> Profile
        </NavLink>
      )}

      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
      ) : (
        <div>
          <LoggedInNavBar setLoggedIn={setLoggedIn} />
        </div>
      )}
    </nav>
  );
}

export default Header;
