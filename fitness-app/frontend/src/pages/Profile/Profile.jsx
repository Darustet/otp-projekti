import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import PostEventIcon from "../../components/Icons/PostEventIcon/PostEventIcon.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";
import SettingsIcon from '../../components/Icons/SettingsIcon/SettingsIcon';
import TopBar from "../../components/TopBar/TopBar.jsx";
import logo from "../../images/logo192.png";
import { useAuthContext } from "../../context/AuthContext.js";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { NotificationCard } from "../../components/NotificationCard/NotificationCard";

const Profile = () => {
    const { loginState } = useAuthContext();
    const [profileData, setProfileData] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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
                // Converting posts to events by adding necessary fields
                const events = userPosts.map((post) => ({
                    _id: post.id,
                    title: post.title,
                    description: post.content,
                    date: post.date, // Assuming each post has a 'date' field
                    // You may need to adjust the date field according to your post structure
                }));
                setPosts(events);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchProfileData();
        fetchPosts();
    }, []);

	return (
		<>
        <div className={styles.container}>
			{profileData && <>
				<TopBar />
				<NavBar />
                <Calendar />
				
				

					<div className={styles.profileInfo}>
						<img src={profileData.avatar || logo} alt="Avatar" className={styles.avatar} />
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
                    <NotificationCard key={event._id} event={event} />
				)}
			</div>
            <PostEventIcon />
		</div>
            <SettingsIcon />
        </>
	);
};

export default Profile;
