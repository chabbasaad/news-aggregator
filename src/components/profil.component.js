import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Outernavbar from './outernavbar.component'
import { Navigate  } from 'react-router-dom';
import Navbar from './navbar.component';
import { Link } from 'react-router-dom';
function Profile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation_password, setConfirmationPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
 



  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)
  //console.log(odata.data.name)
  //console.log(odata.data.token)
  useEffect(() => {
  axios.get('http://localhost:8000/api/profile', {
    headers: {
      'Authorization': `Bearer ${odata.data.token}`
    }
  })
    .then(response => {
      console.log(response.data);
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setAuthenticated(true);
    })
    .catch(error => {
      console.error(error);
      
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('An error occurred while retrieving your profile.');
      }

      setAuthenticated(false);
    });
  }, []);

const handleNameChange = (event) => {
  setName(event.target.value);
};

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};
const handleConfirmationPasswordChange = (event) => {
  setConfirmationPassword(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
console.log(JSON.parse(token));


  axios.put('http://localhost:8000/api/profile', {
    name: name,
    email: email,
    password: password,
    password_confirmation : confirmation_password,
    _method: 'PUT' 
  }, {
    headers: {
      'Authorization': `Bearer ${odata.data.token}`
    }
  })
    .then(response => {
      console.log(response.data);
      alert('Profile updated successfully!');
      window.location = "/dashboard";
    })
    .catch(error => {
      console.error(error);
      
      alert(error.response.data.errors.email[0]+' Please chose an other Email');
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('An error occurred while updating your profile.');
      }
    });
};

if (!authenticated) {
  return null;
}



  return (
   
 <div className='App'>
       <Navbar />
    <div>
<div className='container'>
<h1 className='my-5'>Update Profile</h1>
<form onSubmit={handleSubmit}>
  <div className='mb-3'>
    <label htmlFor='name' className='form-label'>Name:</label>
    <input type='text' id='name' name='name' value={name} onChange={handleNameChange} className='form-control' />
  </div>
  <div className='mb-3'>
    <label htmlFor='email' className='form-label'>Email:</label>
    <input type='email' id='email' name='email' value={email} onChange={handleEmailChange} className='form-control' />
  </div>
  <div className='mb-3'>
    <label htmlFor='password' className='form-label'>Password:</label>
    <input type='password' id='password' name='password' value={password} onChange={handlePasswordChange} className='form-control' />
  </div>
  <div className='mb-3'>
    <label htmlFor='confirmation_password' className='form-label'>Confirmation Password:</label>
    <input type='password' id='password' name='confirmation_password' value={confirmation_password} onChange={handleConfirmationPasswordChange} className='form-control' />
  </div>
  <div className='d-grid gap-2 mt-4'>
    <button type='submit' className='btn btn-primary'>Save Changes</button>
  </div>
</form>
</div>
</div>
</div>
  );
}

export default Profile;