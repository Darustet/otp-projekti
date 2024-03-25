import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "../../NotificationsData/Notification"; // Adjust the import path as necessary
import styles from "./Login.module.scss";
import picture from "../../images/picture.png"; // Import the background image
import { useAuthContextDispatch } from "../../context/AuthContext.js";
import logo from "../../images/logo192.png";
import i18n from "../../i18n/i18n.js";
import { useLanguage } from "../../context/LanguageContext.js";

function Login() {
	const { language, setLanguage } = useLanguage();

	const { t } = i18n;
	const [userTag, setUserTag] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const { addNotification } = useNotifications(); // Correctly use the hook here
	const { dispatch } = useAuthContextDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginData = {
			userTag,
			password,
			rememberMe,
		};
		console.log(loginData);

		try {
			const response = await fetch("http://localhost:4000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			});

			// Handle the response accordingly
			if (response.ok) {
				const data = await response.json();
				// Save the token in local storage
				localStorage.setItem("Token", data.accessToken);
				console.log("login successful!");
				dispatch({
					type: "LOGIN",
					_id: data.accessToken,
					token: data.accessToken,
				});
				navigate("/");
			} else {
				alert("Login failed");

				// Registration failed, handle errors
				console.error("login failed");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className={styles["login-page"]}>
			{/* Container for the image */}
			<div className={styles["login-container"]}>
				<div className={styles["login-content"]}>
					<header className={styles["login-header"]}>
						<img src={logo} alt="Cogie Logo" className={styles["login-logo"]} /> {/* Logo lisätty tähän */}
						<h1>{t("welcome")}</h1>
						<p>{t("Sign in to FitnessApp")}</p>
						<button onClick={() => {setLanguage("ru")}}>English</button>
					</header>
				
					<form className={styles["login-form"]} onSubmit={handleSubmit}>
						<div className={styles["input-group"]}>
							<label htmlFor="password">{t("Username")}</label>
							<input
								type="text"
								id="usertag"
								value={userTag}
								name="userTag"
								placeholder={t("Enter your username or email")}
								onChange={(e) => setUserTag(e.target.value)}
							/>
						</div>
						<div className={styles["input-group"]}>
							<label htmlFor="password">{t("Password")}</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder={t("Enter your password")}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className={styles["form-options"]}>
							<div className={styles["checkbox-group"]}>
								<label htmlFor="remember-me">{t("Remember me")}</label>
								<input
									type="checkbox"
									id="remember-me"
									name="remember-me"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
								/>
							</div>
						</div>
						<button type="submit" className={styles["sign-in-button"]}>
							{t("Sign In")}
						</button>
					</form>
					<div className={styles["sign-up-prompt"]}>
						<span>{t("Don’t have an account?")}</span>
						<Link to="/register" className={styles["sign-up-link"]}>
							{t("Sign up")}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
