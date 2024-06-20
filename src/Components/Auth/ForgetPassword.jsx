// src/Components/Auth/ForgetPassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../Redux/Slices/AuthSlice';
import "./AuthStyle.css";

function ForgetPassword() {
  const [email, setEmailValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5104/api/Account/ForgotPassword?Email=${encodeURIComponent(email)}`, {}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      console.log('Forgot Password Request Successful', response.data);
      dispatch(setEmail(email));
      navigate('/changepass');
    } catch (error) {
      console.error('Forgot Password Request Failed', error);
      // Handle error as needed
    }
  };
  

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ForgetPassword;
