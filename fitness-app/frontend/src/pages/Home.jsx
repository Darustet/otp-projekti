import Calendar from "../components/Calendar/Calendar";
import { useState } from "react";
import Posts from "../components/Posts";
import './home.scss'

const Home = () => {
	const placeholderPosts = ["Post", "Post", "Post", "Post"];
	return (
		<>
			<main>
				<h1>Home</h1>
				<Posts postData={placeholderPosts} />
				<form>
					<input type="button" value="New event (not implemented)" />
				</form>
			</main>
			<Calendar />
		</>
	);
};

export default Home;
