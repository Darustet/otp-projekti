import { Dock } from "primereact/dock";
import ProfileIcon from "./ProfileIcon.svg";
import HomeIcon from "./HomeIcon.svg";
import LogoutIcon from "./LogoutIcon.svg";
import LocaleSwitcher from "../../i18n/LocaleSwitcher";
import style from "./NavBar.module.scss";
import "./dock.scss";
import SVGImg from '../Icons/SVGImg';
import {useAuthContextDispatch} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

export default function BasicDemo() {
	const navigate = useNavigate(),
		{dispatch} = useAuthContextDispatch()

	function logoutDispatch() {
		dispatch({type: "LOGOUT"})
		localStorage.removeItem("Token")
	}

	const items = [
		{
			label: "Profile",
			icon: () => <SVGImg svgFile={ProfileIcon} imgAlt="default profile image"
								styleClass="profileIcon"
								handlerFunction={navigate} stateValue="/profile"/>,
		},
		{
			label: "Home",
			icon: () => <SVGImg svgFile={HomeIcon} imgAlt="home icon"
								styleClass="homeIcon"
								handlerFunction={navigate} stateValue="/"/>,
		},
		{
			label: "Language",
			icon: () => <LocaleSwitcher size={55} location={{ top: 50 }} />,
		},
        {
            label: "Logout",
            icon: () => <SVGImg svgFile={LogoutIcon} imgAlt="logout icon"
								styleClass="logout-icon"
								handlerFunction={logoutDispatch}/>,
        },
	];
	return <Dock id="sidebar" style={{overflow:"visible"}} model={items} position={"left"} />
}
