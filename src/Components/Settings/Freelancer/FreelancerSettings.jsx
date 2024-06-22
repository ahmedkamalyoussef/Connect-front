import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { allSkills as initialSkills } from '../../Data/data'; // Adjust the path as per your project structure

function FreelancerSettings() {
  const [freelancerInfo, setFreelancerInfo] = useState({
    name: '',
    description: '',
    phoneNumber: '',
    profession: '',
    street: '',
    city: '',
    state: '',
    skills: [],
  });
  const [customSkill, setCustomSkill] = useState('');
  const [allSkills, setAllSkills] = useState(initialSkills);
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch freelancer profile data when component mounts
    fetchFreelancerProfile();
  }, []);

  const fetchFreelancerProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5104/api/Freelancer/freelancer-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = response.data;
      console.log(response.data);
      setFreelancerInfo({
        name: profileData.name,
        description: profileData.description,
        phoneNumber: '',
        profession: profileData.profession,
        street: '', 
        city: '', 
        state: '',
        skills: profileData.skills,
      });
    } catch (error) {
      console.error('Error fetching freelancer profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFreelancerInfo({
      ...freelancerInfo,
      [name]: value,
    });
  };

  const handleSkillsChange = (selectedOptions) => {
    if (!selectedOptions) {
      setFreelancerInfo({
        ...freelancerInfo,
        skills: [],
      });
      return;
    }

    const selectedSkills = selectedOptions.map(option => option.value);
    setFreelancerInfo({
      ...freelancerInfo,
      skills: selectedSkills,
    });
  };

  const handleCustomSkillChange = (newValue) => {
    setCustomSkill(newValue);
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() === '') return;
    
    const newSkill = { value: customSkill.toLowerCase(), label: customSkill };
    setAllSkills([...allSkills, newSkill]);
    setFreelancerInfo({
      ...freelancerInfo,
      skills: [...freelancerInfo.skills, newSkill.value],
    });
    setCustomSkill('');
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5104/api/Freelancer/update-freelancer-business',
        freelancerInfo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Freelancer info updated successfully!');
    } catch (error) {
      console.error('Error updating freelancer info:', error);
      setMessage('Failed to update freelancer info.');
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
        'http://localhost:5104/api/Freelancer/update-freelancer-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Freelancer picture updated successfully!');
    } catch (error) {
      console.error('Error updating freelancer picture:', error);
      setMessage('Failed to update freelancer picture.');
    }
  };

  const handleDeletePicture = async () => {
    try {
      const response = await axios.delete('http://localhost:5104/api/Freelancer/delete-freelancer-picture', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Freelancer picture deleted successfully!');
    } catch (error) {
      console.error('Error deleting freelancer picture:', error);
      setMessage('Failed to delete freelancer picture.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Freelancer Settings</h2>
      <form onSubmit={handleSubmitInfo} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={freelancerInfo.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Description:</label>
        <input
          type="text"
          name="description"
          value={freelancerInfo.description}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={freelancerInfo.phoneNumber}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Profession:</label>
        <input
          type="text"
          name="profession"
          value={freelancerInfo.profession}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Street:</label>
        <input
          type="text"
          name="street"
          value={freelancerInfo.street}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>City:</label>
        <input
          type="text"
          name="city"
          value={freelancerInfo.city}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>State:</label>
        <input
          type="text"
          name="state"
          value={freelancerInfo.state}
          onChange={handleInputChange}
          style={styles.input}
        />
        <label style={styles.label}>Skills:</label>
        <Select
          isMulti
          name="skills"
          options={allSkills}
          className="basic-multi-select"
          classNamePrefix="select"
          value={allSkills.filter(option => freelancerInfo.skills.includes(option.value))}
          onChange={handleSkillsChange}
        />
        <div style={{ marginTop: '8px' }}>
          <input
            type="text"
            value={customSkill}
            onChange={(e) => handleCustomSkillChange(e.target.value)}
            placeholder="Enter custom skill"
            style={styles.input}
          />
          <button type="button" onClick={handleAddCustomSkill} style={styles.button}>
            Add Skill
          </button>
        </div>
        <button type="submit" style={styles.button}>Update Info</button>
      </form>
      <form onSubmit={handleSubmitPicture} style={styles.form}>
        <label style={styles.label}>Upload Picture:</label>
        <input
          type="file"
          onChange={handlePictureChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Upload Picture</button>
      </form>
      <div style={{ marginTop: '8px' }}>
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
    marginTop: '8px'},
    message: {
      marginTop: '20px',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#e9ecef',
    },
  };
  
  export default FreelancerSettings;
  
 
