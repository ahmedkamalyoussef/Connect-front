import React from 'react';
import './Profile.css'
function Profile() {
  const profileData = {
    id: "1d71bc9a-faab-400a-98c1-9eccb683d491",
    name: "hdhd",
    description: "string",
    location: null,
    skills: ["string"],
    availability: false,
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundImage: 'url(https://picsum.photos/200)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="card bg-transparent border-0 text-center">
        <img src="https://picsum.photos/200/300" className="card-img-top rounded-circle mx-auto" alt="Profile Avatar" style={{ width: '150px', height: '150px' }} />
        <div className="card-body">
          <h1 className="card-title">{profileData.name}</h1>
          <p className="card-text">{profileData.description}</p>
          {profileData.location && <p>Location: {profileData.location}</p>}
          <div className="my-3">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="badge bg-secondary mx-1">{skill}</span>
            ))}
          </div>
          <p>Availability: {profileData.availability ? 'Available' : 'Not Available'}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
