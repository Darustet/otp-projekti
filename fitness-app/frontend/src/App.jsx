import "./App.scss";
import NavBar from "./components/NavBar/NavBar.jsx";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import ForgotPassword from "./pages/ForgotPassword/Forgot_password.jsx";
import { NotificationProvider } from "./NotificationsData/Notification";
import { useAuthContext } from "./context/AuthContext.js";
import Layout from "./pages/Layout/Layout.jsx";

import "./App.scss";

const { BrowserRouter, Routes, Route, Navigate } = require("react-router-dom");

function App() {
	const { loginState } = useAuthContext();
	const routeData = [
		{
			name: "Home",
			url: "/home",
			component: <Home/>
		},
		{
			name: "Explore",
			url: "/explore",
			component: <Explore />
		},
		{
			name: "Create Event",
			url: "/create-event",
			component: <CreateEvent />
		},
		{
			name: "Login",
			url: "/login",
			component: <Login />
		},
		{
			name: "Profile",
			url: "/profile",
			component: <Profile />
		},
		{
			name: "Register",
			url: "/register",
			component: <Register />
		},
		{
			url: "/forgot-password",
			component: <ForgotPassword />
		}
	];

	function routing(data) {
		return data.map((item, index) =>
			<Route key={index}
			exact path={item.url}
			element={item.component}/>
		)
	}

	return (
		<div className="app">
			<BrowserRouter>
				<NotificationProvider>
					<NavBar />
					<Routes>
						<Route path="/login" element={loginState.id ? <Navigate to="/" /> : <Login />} />
						<Route path="/register" element={loginState.id ? <Navigate to="/" /> : <Register />} />


						<Route path="/layout" element={<Layout />} />
						<Route path="/" element={loginState.id ? <Feed /> : <Navigate to="/login" />} />
						<Route path="/create-event" element={loginState.id ? <CreateEvent /> : <Navigate to="/login" />} />
						<Route path="/profile" element={loginState.id ? <Profile /> : <Navigate to="/login" />} />
						<Route path="/register" element={loginState.id ? <Navigate to="/" /> : <Register />} />
						<Route path="/forgot-password" element={loginState.id ? <Navigate to="/" /> : <ForgotPassword />} />
						<Route path="*" element={<h1>€404 Page not found </h1>} />
					</Routes>
				</NotificationProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
