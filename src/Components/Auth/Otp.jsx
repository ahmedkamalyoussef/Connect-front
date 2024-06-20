import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AuthStyle.css"

function Otp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const handleChange = (e) => { 
    setOtp(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      await axios.post('http://localhost:5104/api/Account/VerifyOTP', { email, otp });
      navigate('/login');
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="otp" className="form-label">OTP</label>
          <input type="text" className="form-control" id="otp" name="otp" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Verify OTP</button>
      </form>
    </div>
  );
}

export default Otp;
