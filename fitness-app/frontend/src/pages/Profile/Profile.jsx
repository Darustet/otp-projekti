import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import PostEventIcon from "../../components/Icons/PostEventIcon/PostEventIcon.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";
import TopBar from "../../components/TopBar/TopBar.jsx";
import logo from "../../images/logo192.png";
import { useAuthContext } from "../../context/AuthContext.js";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { NotificationCard } from "../../components/NotificationCard/NotificationCard";

const Profile = () => {
    const { loginState } = useAuthContext();
    const [profileData, setProfileData] = useState([]);
    const [posts, setPosts] = useState([]);

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
            <TopBar location = {"Profile"} />
            <div className={styles.container}>
            
            <div className={styles.layout}>
                {profileData && (
                    <>
                        <NavBar />
                        <Calendar />
                        <div className={styles.profileInfo}>
                            <img src={profileData.avatar || logo} alt="Avatar" className={styles.avatar} />
                            <PostEventIcon />
                            <div>
                                <h1 className={styles.username}>@{profileData.userTag}</h1>
                                <p className={styles.bio}>{profileData.bio}</p>
                            </div>
                        </div>
                    </>
                )}
                <h2 className={styles.heading}>Your Posts</h2>
                <div className={styles.eventsContainer}>
                    {posts.map((event) => (
                        (<NotificationCard event={event} source={"profile"} />)
                    ))}
                </div>
            </div>
            </div>
        </>
    );
};

export default Profile;
