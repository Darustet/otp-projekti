import style from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { NotificationContext } from "../../context/NotificationControls/NotificationControls";
import { api } from "../../utils/api";

const errorMessage = { type: "error", title: "Registration failed" };

export default function Register() {
	const [addNotification] = useContext(NotificationContext);
	const navigate = useNavigate();
	const [userTag, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const allowedCharacterRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		const numbersRegex = /[0-9]/;

		if (password !== confirmPassword) return addNotification({ ...errorMessage, message: "Passwords don't match" });
		if (password.length < 8) return addNotification({ ...errorMessage, message: "Password must be 8 characters long" });
		if (!allowedCharacterRegex.test(password)) {
			return addNotification({ ...errorMessage, message: "Password needs to contain at least 1 special character" });
		}
		if (!numbersRegex.test(password)) return addNotification({ ...errorMessage, message: "Password needs to contain at least 1 number" });

		if (!userTag) return addNotification({ ...errorMessage, message: "Username cannot be empty" });

		const { status } = await api.createUser({ userTag, email, password });

		if (status === 409) addNotification({ ...errorMessage, message: "User already exists" });
		else if (status === 201) {
			addNotification({ type: "success", message: "Registration successful", title: "Registration successful" });
			navigate("/login");
			setUsername("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
		}
	};
	return (
		<div className={style["main-content"]}>
			<h1 className={style["title"]}>Register</h1>
			<form className={style["login-form"]} onSubmit={handleSubmit}>
				<label htmlFor="userTag">Username:</label>
				<input
					type="text"
					value={userTag}
					id="userTag"
					name="userTag"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="email">Email:</label>
				<input type="email" value={email} id="email" name="email" placeholder="your@email.com" onChange={(e) => setEmail(e.target.value)} />

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					value={password}
					id="password"
					name="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label htmlFor="confirm-password">Confirm password:</label>
				<input
					type="password"
					id="confirm-password"
					value={confirmPassword}
					name="confirm-password"
					placeholder="Confirm password"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</form>
			<div className={style["register-login-container"]}>
				<label htmlFor="login">Existing user? Login here:</label>
				Login
			</div>
		</div>
	);
}
