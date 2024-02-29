import "./App.scss";
import NavBar from "./components/NavBar/NavBar.jsx";
import TopBar from './components/TopBar';
import Home from "./pages/Home";
import Explore from './pages/Explore';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword/Forgot_password.jsx";
import { NotificationProvider } from "./NotificationsData/Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
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
					<TopBar />
					<NavBar linkData={routeData} />
					<Routes>{routing(routeData)}</Routes>
				</NotificationProvider>
	
			</BrowserRouter>	
		</div>
	);
}

export default App;
