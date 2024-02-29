import React from "react";
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";

export default function NavBar({linkData}) {
	const filteredData = linkData.filter(item => item.name);
	return (
		<nav className={style["Nav-bar"]}>
			<img src="" alt="logo" />
			{filteredData.map((item, index) =>
				<Link key={index} to={item.url}>{item.name}</Link>
			)}
		</nav>
	);
}
