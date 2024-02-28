import React from "react";
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<nav className={style["Nav-bar"]}>
			<img src="" alt="logo" />
			<Link to="/">home</Link>
			<Link to="/profile">profile</Link>
			<Link to="/explore">explore</Link>
			<Link to="/create-event">create event</Link>
			<Link to="/login">login</Link>
			<Link to="/register">register</Link>
			<Link to="/forgot-password">forgot password</Link>
		</nav>
	);
}
