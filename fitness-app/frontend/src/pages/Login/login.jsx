import React from "react";
import { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { api } from "../../utils/api";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext";

//import picture from "../../images/picture.png"; // Import the background image


export default function Login() {
	const [addNotification] = useContext(AuthenticationContext);
	const { dispatchAuthentication } = useContext(AuthenticationContext);
	const navigate = useNavigate();
	const [userTag, setUsertag] = useState("");
	const [password, setPassword] = useState("");
	const [rememberPassword, setRememberPassword] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = { userTag, password, rememberPassword };
		try {
			const { status } = await api.login(user);
			if (status === 400) {
				addNotification({ type: "error", message: "Wrong password", title: "Login failed", duration: 5000 });
			} else if (status === 404) {
				addNotification({ type: "error", message: "User not found", title: "Login failed", duration: 5000 });
			} else if (status === 200) {
				const { status, data } = await api.getAuthUserInfo();
				if (status !== 200) return;

				dispatchAuthentication({ type: "login", user: data, rememberPassword });
				addNotification({ type: "success", message: "Login successful", title: "Login successful", duration: 2000 });
				navigate(`/user/${userTag}`);
			}
		} catch (error) {
			addNotification({ type: "error", message: "Internal server error", title: "Network problems", duration: 5000 });
		}

		setUsertag("");
		setPassword("");
	};

	return (
		<div className={styles["login-page"]}>
			<div className={styles["image-container"]}></div> {/* Container for the image */}
			<div className={styles["login-container"]}>
				<div className={styles["login-content"]}>
					<header className={styles["login-header"]}>
						<h1>Welcome Back</h1>
						<p>Sign in to continue</p>
					</header>
					<form className={styles["login-form"]} onSubmit={handleSubmit}>
						<div className={styles["input-group"]}>
							<label htmlFor="password">Username</label>
							<input
								type="text"
								id="usertag"
								value={userTag}
								name="userTag"
								placeholder="Username or Email"
								onChange={(e) => setUsertag(e.target.value)}
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
								<input
									type="checkbox"
									id="remember-me"
									name="remember-me"
									checked={rememberPassword}
									onChange={(e) => setRememberPassword(e.target.checked)}
								/>
								<label htmlFor="remember-me">Remember me</label>
							</div>
							<Link to="/forgot-password" className={styles["forgot-password"]}>
								Forgot Password
							</Link>
						</div>
						<button type="submit" className={styles["sign-in-button"]}>
							Sign In
						</button>
					</form>
					<div className={styles["sign-up-prompt"]}>
						<span>Don’t have an account?</span>
						<Link to="/register" className={styles["sign-up-link"]}>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

