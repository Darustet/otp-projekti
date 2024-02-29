import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import TopBar from "./components/TopBar";
import Home from "./pages/Home/Home.jsx";
import Explore from "./pages/Explore";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword/Forgot_password.jsx";
import "./App.scss";

function App() {
	return (
		<BrowserRouter>
			<div>
				<TopBar />
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/create-event" element={<CreateEvent />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgotpassword" element={<ForgotPassword />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
