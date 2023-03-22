import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './navbar.component';
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    const udata = localStorage.getItem('user')
    
    const odata = JSON.parse(udata)
    console.log(odata.data.name)
    console.log(odata.data.token)
    let loggedIN = true
    if (udata == null){
      loggedIN = false
    }
    this.state = {
      user : odata.data.name,
      loggedIN
      
     
    }
}

 
  render() {
    if(this.state.loggedIN === false){
      return  <Navigate to="/sign-in" />
    }
    return (
        <div>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">News Agregator</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/dashboard">Home</Link>
              </li>
              <li className ="nav-item">
              <Link className="nav-link active" aria-current="page" to="/news">NewsApi </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/guardian">GuardianApi</Link>
              </li>
              <li className ="nav-item">
              <Link className="nav-link active" aria-current="page" to="/profil">Profil</Link>
              </li>
              </ul>
             
              <ul className="navbar-nav">
                 <Link className="nav-link" to="/logout">logout </Link>
              </ul>
          </div>
        </div>
      </nav> */}
         <Navbar />

      <h1 className="text-black mt-5">welcome to your profile <span className="text-primary">{this.state.user} </span></h1>
      </div>
    )
  }
}
