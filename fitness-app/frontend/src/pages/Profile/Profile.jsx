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

export default function Profile() {
    const {language, setLanguage} = useLanguage(),
        {t} = i18n,
        { loginState } = useAuthContext(),
        [profileData, setProfileData] = useState([]),
        [posts, setPosts] = useState([]),
        navigate = useNavigate()

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
                {profileData && <div className={styles.profileInfo}>
                    <img src={profileData.avatar || logo} alt="Avatar" className={styles.avatar} />
                    {/*post event icon*/}
                    <div>
                        <h1 className={styles.username}>@{profileData.userTag}</h1>
                        <p className={styles.bio}>{profileData.bio}</p>
                    </div>
                </div>}
                <h2 className={styles.heading}>{t("Your Posts")}</h2>
                    <div className={styles.eventsContainer}>
                        {posts.map((event) =>
                            <NotificationCard event={event} source={"profile"} />
                        )}
                    </div>
                </div>
            </div>
            <SVGImg svgFile={postIcon} imgAlt="image of plus sign"
                    styleClass="post-icon"
                    handlerFunction={navigate} stateValue="/create-event"/>
        </>
    );
};
