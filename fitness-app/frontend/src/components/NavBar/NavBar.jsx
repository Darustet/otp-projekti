import React from "react";
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function NavBar() {
	const { loginState } = useAuthContext();
	console.log(loginState.id);
	return (
		<nav className={style["Nav-bar"]}>
			<Link to="/">home</Link>
			<Link to="/profile">profile</Link>
			<Link to="/create-event">create event</Link>
			{loginState.id ? <button>Logout</button> : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</>
			)}
		</nav>
	);
}
