import React from "react";
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
//import Calendar from "../../components/Calendar/Calendar.jsx";
//import { useAuthContextDispatch } from "../../context/AuthContext";
import LogoutIcon from "../Icons/LogoutIcon/LogoutIcon";
import ProfileIcon from "../Icons/ProfileIcon/ProfileIcon";
import HomeIcon from "../Icons/HomeIcon/HomeIcon";

export default function NavBar() {
	//const filteredData = linkData.filter(item => item.name);

	const { loginState } = useAuthContext();
	console.log(loginState.id);
	return (
		<nav className={style["Nav-bar"]}>
			<ProfileIcon />
			<HomeIcon />
			<LogoutIcon  color= {"red"}/>

			{loginState.id ? (<>

					<Link to="/">Feed</Link>
					<Link to="/profile">Profile</Link>
					<Link to="/create-event">Create Event</Link>

				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</>
			)}
		</nav>
	);
}
