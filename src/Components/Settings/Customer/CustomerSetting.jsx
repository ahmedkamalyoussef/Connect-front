import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function CustomerSetting() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    street: '',
    phoneNumber: '',
    city: '',
    state: '',
  });
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchCustomerProfile();
  }, []);

  const fetchCustomerProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5104/api/Account/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = response.data;
      console.log(profileData);

      setCustomerInfo({
        name: profileData.name || '',
        street: profileData.street || '',
        phoneNumber: profileData.phoneNumber || '',
        city: profileData.city || '',
        state: profileData.state || '',
      });
    } catch (error) {
      console.error('Error fetching customer profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5104/api/Account/update-customer-info',
        customerInfo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Customer info updated successfully!');
    } catch (error) {
      console.error('Error updating customer info', error);
      setMessage('Failed to update customer info.');
    }
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (picture) {
        formData.append('file', picture);
      }

      const response = await axios.put(
        'http://localhost:5104/api/Account/Update-customer-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Customer picture updated successfully!');
    } catch (error) {
      console.error('Error updating picture:', error);
      setMessage('Failed to update customer picture.');
    }
  };

  const handleDeletePicture = async () => {
    try {
      const response = await axios.delete('http://localhost:5104/api/Account/delete-customer-picture', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Customer picture deleted successfully!');
    } catch (error) {
      console.error('Error deleting picture:', error);
      setMessage('Failed to delete customer picture.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Settings</h2>
      <form onSubmit={handleSubmitInfo} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Street:</label>
        <input
          type="text"
          name="street"
          value={customerInfo.street}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={customerInfo.phoneNumber}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>City:</label>
        <input
          type="text"
          name="city"
          value={customerInfo.city}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>State:</label>
        <input
          type="text"
          name="state"
          value={customerInfo.state}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Update Info
        </button>
      </form>
      <form onSubmit={handleSubmitPicture} style={styles.form}>
        <label style={styles.label}>Upload Picture:</label>
        <input type="file" onChange={handlePictureChange} style={styles.input} />
        <button type="submit" style={styles.button}>
          Upload Picture
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleDeletePicture} style={styles.button}>
          Delete Picture
        </button>
      </div>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '12px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  message: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#e9ecef',
  },
};

export default CustomerSetting;
