import React, { Component } from 'react'
import Outernavbar from './outernavbar.component'
 import axios from 'axios';



export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    }
    onChangeFirstName(e) {
        this.setState({ name: e.target.value })
    }
    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onChangePasswordConfirmation(e) {
        this.setState({ password_confirmation: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

    if(this.state.name.length<2 || this.state.name.length>20 ){
      alert("First-name should be between 2-20 charaters")
    }
    if(this.state.password.length<6 ){
      alert("Password should be greater then 5 charaters")
    }
    if(this.state.password !== this.state.password_confirmation ){
      alert("Enter same password in both fields")
    }

        const userObject = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.password_confirmation,
        };
        axios.post('http://localhost:8000/api/register', {
          name: this.state.name,
          email: this.state.email,
          password:this.state.password,
          c_password: this.state.password_confirmation,
        })
            .then((res) => {
               console.log(res,"aaaaaaaaaaa");
               window.location = "/sign-in";
                if(res.data.message === "User successfully registered"){
                   // alert("Registration Successful")
                  
                
                }
            }).catch((error) => {
                if(error.response.data ===  "{\"email\":[\"The email has already been taken.\"]}"){
                  alert("The email has already been taken.")
                }
            });
        this.setState({ name: '', email: '', password: '', c_password: '' })
    }


  render() {
    return (
        <div className='App'>
        <Outernavbar/>
        <div className="auth-wrapper">
      <div className="auth-inner">
      <form onSubmit={this.onSubmit}
                 >
        <h3>Sign Up</h3>
        <div>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={this.onChangeFirstName}
            name="firstname"
            value={this.state.name}
          />
         
        </div>
     
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.onChangeUserEmail}
            name="email"
            value={this.state.email}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.onChangePassword}
            name="password"
            value={this.state.password}
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.onChangePasswordConfirmation}
            name="confirmpassword"
            value={this.state.password_confirmation}
          />
        </div>
        <div className="d-grid">
        <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
        </div>
        

      </form>
      </div>
      </div>
      </div>
     
    )
  }
}