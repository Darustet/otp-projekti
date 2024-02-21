<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
import style from "./Login.module.scss";

const Login = () => {
	return (
		<div className={style["login-container "]}>
			<h2>Login</h2>
			<div className={style["form-group"]}>
				<label htmlFor={"username"}></label>
				<input type="text" id="username" name="username" placeholder="Enter your email adress or username" />
			</div>
=======
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
	return (
		<>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Login Page</title>
			<link rel="stylesheet" href={styles.container} />
>>>>>>> Stashed changes

			<div className={styles.container}>
				<div className={styles.formContainer}>
					<h2>Login</h2>
					<div className={styles.formGroup}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Enter your username"
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter your password"
						/>
					</div>
					<div className={styles.formGroup}>
						<button type="button">Login</button>
					</div>
					<div className={styles.options}>
						<Link to="#">Forgot password</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
>>>>>>> Stashed changes
