import React, { useState } from "react";
import styles from "./Register.module.scss";

const Register = () => {
	const [userTag, setUserTag] = useState("");
	const [email, setUserEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault(); 
	
		const registrationData = {
			userTag,
			email,
			password,
		};

		try {
			const response = await fetch("http://localhost:4000/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registrationData),
			});

			// Handle the response accordingly
			if (response.ok) {
				// Registration successful, you can redirect or show a success message
				console.log("Registration successful!");
			} else {
				// Registration failed, handle errors
				console.error("Registration failed");
			}
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	return (
		<div className={styles["register-page"]}>
			<div className={styles["image-container"]}></div>
			<div className={styles["register-container"]}>
				<div className={styles["register-content"]}>
					<header className={styles["register-header"]}>
						<h1>Register</h1>
						<p>Get started by creating your account</p>
					</header>
					<form className={styles["register-form"]} onSubmit={handleSubmit}>
						<div className={styles["input-group"]}>
							<label htmlFor="userTag">Username</label>
							<input
								type="text"
								id="userTag"
								value={userTag}
								name="userTag"
								placeholder="Enter your username"
								onChange={(e) => setUserTag(e.target.value)}
							/>
						</div>
						<div className={styles["input-group"]}>
							<label htmlFor="email">Email</label>
							<input
								type="text"
								id="email"
								value={email}
								name="email"
								placeholder="Enter your email"
								onChange={(e) => setUserEmail(e.target.value)}
							/>
						</div>
						<div className={styles["input-group"]}>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								value={password}
								name="password"
								placeholder="Enter your password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className={styles["input-group"]}>
							<label htmlFor="confirmPassword">Confirm password</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								name="confirmPassword"
								placeholder="Confirm your password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className={styles["register-button"]}>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
