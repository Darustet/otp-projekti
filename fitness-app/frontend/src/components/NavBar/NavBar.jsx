import React from "react";
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutIcon from "../Icons/LogoutIcon/LogoutIcon";
import ProfileIcon from "../Icons/ProfileIcon/ProfileIcon";
import HomeIcon from "../Icons/HomeIcon/HomeIcon";
import LangIcon from "../Icons/LangIcon/LangIcon";

export default function NavBar() {
	
	const { loginState } = useAuthContext();
	console.log(loginState.id);
	return (
		<nav className={style["Nav-bar"]}>
			<ProfileIcon className={style["profileIcon"]} />
			<HomeIcon className={style["homeIcon"]} />
			<LogoutIcon className={style["logout-icon"]} />
			<LangIcon className={style["lang-icon"]} />
			{loginState.id ? (
				<>
					<Link to="/" className={style["link"]}></Link>
					<Link to="/profile" className={style["link"]}></Link>
					<Link to="/create-event" className={style["link"]}></Link>
				</>
			) : (
				<>
					<Link to="/login" className={style["link"]}>
					</Link>
					<Link to="/register" className={style["link"]}>
					</Link>
				</>
			)}
		</nav>
	);
}
