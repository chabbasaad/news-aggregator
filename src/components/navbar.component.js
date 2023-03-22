import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">News Aggregator</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/dashboard">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/news">NewsApi</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/guardian">GuardianApi</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/times">NewYORKTimes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/profil">Profil</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <Link className="nav-link" to="/logout">Logout</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;