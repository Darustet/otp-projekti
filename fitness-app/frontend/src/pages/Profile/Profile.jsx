import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar.jsx";
//import SettingsIcon from '../../components/Icons/SettingsIcon/SettingsIcon';
import TopBar from "../../components/TopBar/TopBar.jsx";
import logo from "../../images/logo192.png";
import { useAuthContext } from "../../context/AuthContext.js";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { NotificationCard } from "../../components/NotificationCard/NotificationCard";
import SVGIcon from '../../components/Icons/SVGIcon';

export default function Profile() {
    const { loginState } = useAuthContext(),
        [profileData, setProfileData] = useState(null),
        [posts, setPosts] = useState([]),
        navigate = useNavigate();

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
            <TopBar location={"Profile"} />
            <div className={styles.container}>
                <NavBar />
                <div className={styles.layout}>
                {profileData && <>
                        <Calendar />
                        <div className={styles.profileInfo}>
                            <img src={profileData.avatar || logo} alt="Avatar" className={styles.avatar} />
                            {/*post event icon*/}
                            <div>
                                <h1 className={styles.username}>@{profileData.userTag}</h1>
                                <p className={styles.bio}>{profileData.bio}</p>
                            </div>
                        </div>
                    </>
                }
                <h2 className={styles.heading}>Your Posts</h2>
                <div className={styles.eventsContainer}>
                    {posts.map((event) =>
                        <NotificationCard event={event} source={"profile"} />
                    )}
                </div>
                <SVGIcon type="nagivate" navUrl="/create-event"
                         styleClass="post-icon"
                         pathD="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                         />
                </div>
            </div>
        </>
	);
};
