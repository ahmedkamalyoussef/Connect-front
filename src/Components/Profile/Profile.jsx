import React from 'react';
import './Profile.css';

function Profile() {
  const profileData = {
    id: "1d71bc9a-faab-400a-98c1-9eccb683d491",
    name: "Hamza",
    Profession: "Developer",
    description: "jfgfjkkfjklgjlkflgl;f",
  };

  return (
    <div
      className="profile-container"
      style={{ backgroundImage: 'url(https://picsum.photos/820/312)' }}
    >
      <div>
        <img
          src="https://picsum.photos/200/300"
          className="profile-avatar rounded-circle mx-auto"
          alt="Profile Avatar"
        />
        <div className="card-body">
          <h1 className="card-title profile-title">{profileData.name}</h1>
          <p className="card-text profile-text">{profileData.Profession}</p>
          <p className="card-text profile-text">{profileData.description}</p>
          <div className="profile-buttons">
            <button className="profile-button message">Send Message</button>
            <button className="profile-button update">Update Info</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
 