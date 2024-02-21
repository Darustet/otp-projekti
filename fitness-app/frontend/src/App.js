//import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import "./App.scss";

function App() {
	const routes = [
		{
			name: "Home",
			url: "/",
			component: <Home />,
		},
		{
			name: "Explore",
			url: "/explore",
		},
		{
			name: "Create Event",
			url: "/create-event",
		},
		{
			name: "Login",
			url: "/login",
			component: <Login />,
		},
		{
			name: "Profile",
			url: "/profile",
			component: <Profile />,
		},
		{
			name: "Settings",
			url: "/settings",
		},
	];
	const routing = (routingItems) => {
		return routingItems.map((item, index) => <Route key={index} path={item.url} element={item.component} />);
	};

	return (
		<div>
			<NavBar routes={routes} />
			<Router basename="/">
				<Routes>{routing(routes)}</Routes>
			</Router>
		</div>
	);
}

export default App;
