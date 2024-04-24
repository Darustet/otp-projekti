import React, { useState, useEffect, useRef } from 'react';
import styles from './TopBar.module.scss';
import logo from '../../images/logo192.png';
import { useAuthContext } from '../../context/AuthContext.js';
import LocaleSwitcher from '../../i18n/LocaleSwitcher.jsx';
import i18n from '../../i18n/i18n';
import SettingsIcon from "../Icons/SettingsIcon.svg";
import SVGImg from '../Icons/SVGImg';



const TopBar = ({ location, setSearchTerm }) => {
  const { t } = i18n;
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({});
  const { loginState } = useAuthContext();
  const modalRef = useRef();
  const [searchValue, setSearchValue] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Do something with the searchValue, like sending it to a server or filtering data
      setSearchTerm(searchValue);
      console.log('Search value:', searchValue);
    }
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
          {/*<p className={styles.header}>{location}</p>*/}
        <div className={styles.searchContainer}>
          <form>
            <input
                type="search"
                placeholder= {t("Search" )}
                value={searchValue}
                onChange={handleSearchChange}
                className={styles.searchInput}
                onKeyPress={handleKeyPress}
            />
          </form>
        </div>

        <SVGImg svgFile={SettingsIcon} imgAlt="settings gear-wheel icon"
                styleClass="settingsIcon"
                handlerFunction={handleSettingsClick}/>
        

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
                <div className={styles.editProfileForm}>
                  <input
                      type="text"
                      name="userTag"
                      value={updatedProfileData.userTag || ''}
                      onChange={handleInputChange}
                      placeholder= {t("Username")}
                  />
                  <input
                      type="text"
                      name="bio"
                      value={updatedProfileData.bio || ''}
                      onChange={handleInputChange}
                      placeholder= {t("Bio")}
                  />
                  <input
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      accept="image/*"
                  />
                  <div>
                    <button onClick={handleSaveChanges}>{t("Save Changes")}</button>
                    <button onClick={handleCancel}>{t("Cancel")}</button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default TopBar;
