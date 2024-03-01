import React, { useContext } from "react"; // Olettaen, että sinulla on tämä konteksti
import Post from "../Post/Post";
import Calendar from "../../components/Calendar/Calendar";
import "./Home.scss";

const Home = () => {
	return (
		<>
			<main>
				<h1>Home</h1>
				{/* Tässä voit esittää staattisia tai esimerkki postauksia */}
				<Post postData={["Esimerkki postaus 1", "Esimerkki postaus 2"]} />
				<form>
					<input type="button" value="Uusi tapahtuma (ei toteutettu)" />
				</form>
			</main>
			<Calendar />
		</>
	);
};

export default Home;
