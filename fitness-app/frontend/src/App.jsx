

import NavBar from "./components/NavBar/NavBar.jsx";
//import DomainRouting from './components/DomainRouting';
//import TopBar from './components/TopBar';
import Home from "./pages/Home";
import Explore from './pages/Explore';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword/Forgot_password.jsx";
import { NotificationProvider } from "./NotificationsData/Notification";

import "./App.scss";

const { BrowserRouter, Routes, Route } = require("react-router-dom");


function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<NotificationProvider>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Explore />} />
						<Route path="/create-event" element={<CreateEvent />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/register" element={<Register />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						
					</Routes>
				</NotificationProvider>
	
			</BrowserRouter>	
		</div>
	);
}

export default App;
