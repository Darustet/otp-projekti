import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "../../NotificationsData/Notification"; // Adjust the import path as necessary
import styles from "./Login.module.scss";
import picture from "../../images/picture.png"; // Import the background image

function Login() {
	const [userTag, setUserTag] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const { addNotification } = useNotifications(); // Correctly use the hook here

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Simulate an API call with a timeout
		setTimeout(() => {
			if (userTag === "testUser" && password === "testPassword") {
				addNotification({ type: "success", message: "Login successful", title: "Success", duration: 5000 });
				// Navigate or update state as needed
				navigate(`/user/${userTag}`);
			} else {
				addNotification({ type: "error", message: "Incorrect username or password", title: "Login Failed", duration: 5000 });
			}
		}, 1000); // Simulate network delay
	};

	return (
		<div className={styles["login-page"]}>
			<div className={styles["image-container"]}></div> {/* Container for the image */}
			<div className={styles["login-container"]}>
				<div className={styles["login-content"]}>
					<header className={styles["login-header"]}>
						<h1>Welcome</h1>
						<p>Sign in to FitnessApp</p>
					</header>
					<form className={styles["login-form"]} onSubmit={handleSubmit}>
						<div className={styles["input-group"]}>
							<label htmlFor="password">Username</label>
							<input
								type="text"
								id="usertag"
								value={userTag}
								name="userTag"
								placeholder=" Enter your username or email"
								onChange={(e) => setUserTag(e.target.value)}
							/>

						</div>
						<div className={styles["input-group"]}>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className={styles["form-options"]}>
							<div className={styles["checkbox-group"]}>
								<label htmlFor="remember-me">Remember me</label>
								<input
									type="checkbox"
									id="remember-me"
									name="remember-me"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
								/>
							</div>
							<Link to="/forgotpassword" className={styles["forgotpassword"]}>
								Forgot Password
							</Link>

						</div>
						<button type="submit" className={styles["sign-in-button"]}>
							Sign In
						</button>
					</form>
					<div className={styles["sign-up-prompt"]}>
						<span>Don’t have an account? </span>
						<Link to="/register" className={styles["sign-up-link"]}>
							Sign Up
						</Link>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
