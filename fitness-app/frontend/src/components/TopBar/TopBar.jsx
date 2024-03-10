// TopBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './TopBar.module.scss';
import SettingsIcon from '../Icons/SettingsIcon/SettingsIcon';
import logo from '../../images/logo192.png';
import { useAuthContext } from '../../context/AuthContext.js';
import Settings from '../Settings/Settings.jsx'; // Assuming the correct path to the Settings component

const TopBar = ({ location }) => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({});
  const { loginState } = useAuthContext();
  const modalRef = useRef();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${loginState.token}`,
          },
        });
        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [loginState.token]);

  const handleSettingsClick = () => {
    setEditMode(true);
    setUpdatedProfileData({ ...profileData });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedProfileData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      Object.entries(updatedProfileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch("http://localhost:4000/api/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${loginState.token}`,
        },
        body: JSON.stringify(updatedProfileData),
      });
      const data = await res.json();
      setProfileData(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className={styles.topBar}>
        <p className={styles.header}>{location}</p>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>

        <button className={styles.settingsButton} onClick={handleSettingsClick}>
          <SettingsIcon />
        </button>

        <div className={styles.userSettings}>
          <div className={styles.userDetails}>
            {profileData && !editMode && (
                <>
                  <img src={profileData.profilePicture || logo} alt="Profile" className={styles.profileImage} />
                  <span>{profileData.userTag}</span>
                </>
            )}
          </div>
        </div>

        {editMode && (
            <div className={styles.modalBackground}>
              <div className={styles.editProfileModal} ref={modalRef}>
                <Settings />
                <div className={styles.editProfileForm}>
                  <input
                      type="text"
                      name="userTag"
                      value={updatedProfileData.userTag || ''}
                      onChange={handleInputChange}
                      placeholder="Username"
                  />
                  <input
                      type="text"
                      name="bio"
                      value={updatedProfileData.bio || ''}
                      onChange={handleInputChange}
                      placeholder="Bio"
                  />
                  <input
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      accept="image/*"
                  />
                  <div>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default TopBar;
