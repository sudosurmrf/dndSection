/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
/* import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
function Navigations({ token, setToken }) {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/books">Books</Link>
        </li>
        {token ? (
          <>
            <li className="nav-item">
              <Link to="/account">Account</Link>
            </li>
            <li className="nav-item">
              <button onClick={() => setToken(null)} className="nav-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navigations; */