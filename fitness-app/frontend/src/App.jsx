import "./App.scss";
import NavBar from "./components/NavBar/NavBar.jsx";

import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import { NotificationProvider } from "./NotificationsData/Notification";
import { useAuthContext } from "./context/AuthContext.js";
import Layout from "./pages/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
	const { loginState } = useAuthContext();
	const routeData = [
		{
			name: "Feed",
			url: "/",
			idFound: <Feed />,
			idFailed: <Navigate to="/login"/>
		},
		{
			name: "Login",
			url: "/login",
			idFound: <Navigate to="/"/>,
			idFailed: <Login />
		},
		{
			name: "Create Event",
			url: "/create-event",
			idFound: <CreateEvent />,
			idFailed: <Navigate to="/login"/>
		},
		{
			name: "Profile",
			url: "/profile",
			idFound: <Profile />,
			idFailed: <Navigate to="/login"/>
		},
		{
			name: "Register",
			url: "/register",
			idFound: <Navigate to="/"/>,
			idFailed: <Register />
		},
		{
			url: "/layout",
			component: <Layout />
		},
		{
			url: "*",
			component: <h1>€404 Page not found</h1>
		}
	];

	function routing(data) {
		return data.map((item, index) => {
				if(item.isSimple) {
					return <Route key={index}
								  exact path={item.url}
								  element={item.component}/>
				} else {
					return <Route key={index}
								  exact path={item.url}
								  element={loginState.id ? item.idFound : item.idFailed}/>
				}
			}
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
