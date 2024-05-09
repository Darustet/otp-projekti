import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
//import SettingsIcon from '../../components/Icons/SettingsIcon/SettingsIcon';
import postIcon from './PostIcon.svg';
import TopBar from "../../components/TopBar/TopBar.jsx";
import logo from "../../images/logo192.png";
import { useAuthContext } from "../../context/AuthContext.js";
import { NotificationCard } from "../../components/NotificationCard/NotificationCard";
import { useLanguage } from "../../context/LanguageContext.js";
import i18n from "../../i18n/i18n.js";
import SVGImg from '../../components/Icons/SVGImg';
import SettingsIcon from "../../../src/components/Icons/SettingsIcon.svg";
import { useRef } from "react";


export default function Profile({toastTC}) {
    const modalRef = useRef();
    const [editMode, setEditMode] = useState(false);
    const [updatedProfileData, setUpdatedProfileData] = useState({});
    const {language, setLanguage} = useLanguage(),
        {t} = i18n,
        { loginState } = useAuthContext(),
        [profileData, setProfileData] = useState([]),
        [posts, setPosts] = useState([]),
        navigate = useNavigate()

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
      toastTC.current.show({severity:'success', summary: t('Success'), detail:t('Profile updated'), life: 3000});
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
      

        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/posts/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${loginState.token}`,
                    },
                });
                const userPosts = await res.json();
                setPosts(userPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchProfileData();
        fetchPosts();
    }, []);

    return (
        <>
            <TopBar location={t("Profile")} />
            <div className={styles.container}>
           
        
                <div className={styles.layout}>

                  <div  className={styles.settings}>

                  
                <SVGImg svgFile={SettingsIcon} imgAlt="settings gear-wheel icon"
                styleClass="settingsIcon"
            
                handlerFunction={handleSettingsClick}/>
                </div>
                <div className={styles.left} >

                
                {profileData && <div className={styles.profileInfo}>
                    <img src={profileData.avatar || logo} alt="Avatar" className={styles.avatar} />
                    {/*post event icon*/}
                    <div>
                        <h1 className={styles.username}>@{profileData.userTag}</h1>
                        <p className={styles.bio}>{profileData.bio}</p>
                    </div>
                </div>}
                </div>
                <h2 className={styles.heading}>{t("Your Posts")}</h2>
                    <div className={styles.postsContainer}>
                        {posts.map((event) =>
                            <NotificationCard event={event} source={"profile"} />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.newPost}>
            <SVGImg svgFile={postIcon} imgAlt="image of plus sign"
                    styleClass="post-icon"
                    handlerFunction={navigate} stateValue="/create-event"/>
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
        </>
    );
};
