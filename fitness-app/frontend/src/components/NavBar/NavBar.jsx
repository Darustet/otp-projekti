import React, {useState, createContext} from 'react';
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SVGIcon from '../Icons/SVGIcon';

export default function NavBar() {

	const { loginState } = useAuthContext();
	const [pageTheme, setPageTheme] = useState(false);
	console.log(loginState.id);
	return (
		<nav className={style["Nav-bar"]}>
			<SVGIcon type="navigate" navUrl="/profile"
					 styleClass="profileIcon"
					 pathD="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
			/>
			<SVGIcon type="navigate" navUrl="/"
					 styleClass="homeIcon"
					 pathD="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"
			/>
			<SVGIcon type="logout"
					 styleClass="logout-icon" currentColor="black"
					 pathD="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"
			/>

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
