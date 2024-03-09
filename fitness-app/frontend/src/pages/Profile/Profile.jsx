import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import PostEventIcon from "../../components/Icons/PostEventIcon/PostEventIcon.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";
import TopBar from "../../components/TopBar/TopBar.jsx";
import logo from "../../images/logo192.png";
import { useAuthContext } from "../../context/AuthContext.js";

import NavBar from "../../components/NavBar/NavBar.jsx";

const Profile = () => {
	const {loginState} = useAuthContext();
	const [profileData, setProfileData] = useState(null);
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// Mock API request to get profile data
		const fetchProfileData = async () => {
			try {
				// Mock profile data
				const res = await fetch("http://localhost:4000/api/users/me", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${loginState.token}`,
					},
				});
				const data = await res.json()
				setProfileData(data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		};

		// Mock API request to get posts
		const fetchPosts = async () => {
			try {
				// Mock data
				const mockPosts = [
					{ id: 1, title: "Post 1", content: "This is the content of Post 1." },
					{ id: 2, title: "Post 2", content: "This is the content of Post 2." },
					{ id: 3, title: "Post 3", content: "This is the content of Post 3." },
				];
				setPosts(mockPosts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchProfileData();
		fetchPosts();
	}, []);

	return (
		<div className={styles.container}>
			{profileData && (
				<>
					<TopBar />
					<NavBar />
					<Calendar />

					<div className={styles.profileInfo}>
						<img src={profileData.avatar || logo} alt="Avatar" className={styles.avatar} />
						<PostEventIcon />
						<div>
							<h1 className={styles.username}>@{profileData.username}</h1>
							<p className={styles.bio}>{profileData.bio}</p>
						</div>
					</div>
				</>
			)}
			<h2 className={styles.heading}>Your Posts</h2>
			<div className={styles.postsContainer}>
				{posts.map((post) => (
					<div key={post.id} className={styles.post}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Profile;
