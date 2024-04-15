import { Dock } from "primereact/dock";
import { useState } from "react";
import ProfileIcon from "../Icons/ProfileIcon/ProfileIcon";
import HomeIcon from "../Icons/HomeIcon/HomeIcon";
import LogoutIcon from "../Icons/LogoutIcon/LogoutIcon";
import LocaleSwitcher from "../../i18n/LocaleSwitcher";
import style from "./NavBar.module.scss";
import "./dock.scss";

export default function BasicDemo() {
	const items = [
		{
			label: "Profile",
			icon: () => <ProfileIcon className={style["profileIcon"]} />,
		},
		{
			label: "Home",
			icon: () => <HomeIcon className={style["homeIcon"]} />,
		},
		
		{
			label: "Language",
			icon: () => <LocaleSwitcher size={40} location={{ top: 50 }} />,
		},
        {
            label: "Logout",
            icon: () => <LogoutIcon className={style["logout-icon"]} />,
        },
	];
	return (
	
	<Dock id="sidebar" style={{overflow:"visible"}} model={items} position={"left"} />
	
	);
}
