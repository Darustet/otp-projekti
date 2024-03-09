import React, {useState, createContext} from 'react';
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutIcon from "../Icons/LogoutIcon/LogoutIcon";
import ProfileIcon from "../Icons/ProfileIcon/ProfileIcon";
import HomeIcon from "../Icons/HomeIcon/HomeIcon";

export default function NavBar() {

	const { loginState } = useAuthContext();
	const [pageTheme, setPageTheme] = useState(false);
	console.log(loginState.id);
	return (
		<nav className={style["Nav-bar"]}>
			<ProfileIcon />
			<HomeIcon />
			<LogoutIcon color="black"/>

			{/*loginState.id ? <>
				<Link to="/" className="link"></Link>
				<Link to="/profile" className="link"></Link>
				<Link to="/create-event" className="link"></Link>
			</> : <>
				<Link to="/login" className="link">Login</Link>
				<Link to="/register" className="link">Register</Link>
			</>
			*/(!loginState.id && <>
				<Link to="/login" className="link">Login</Link>
				<Link to="/register" className="link">Register</Link>
			</>)}
			{/*<div>
				<input type="checkbox"
					   onClick={() => setPageTheme(!pageTheme)}/>
				{pageTheme ? 'Light' : 'Dark'}
			</div>*/}
		</nav>
	);
}
