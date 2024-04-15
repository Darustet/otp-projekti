import "./App.scss";
import NavBar from "./components/NavBar/newBar.jsx";

import CreateEvent from "./pages/CreateEvent/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent/UpdateEvent.jsx";
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import { NotificationProvider } from "./NotificationsData/Notification";
import { useAuthContext } from "./context/AuthContext.js";
import Layout from "./pages/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext.js";
import i18n from "./i18n/i18n.js";
import { useEffect,useRef } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import { Toast } from 'primereact/toast';



	

function App() {
	const toastTR = useRef(null);
	const toastTC = useRef(null);
	const { language } = useLanguage();
	useEffect(() => {
		const dir = i18n.dir(i18n.language);
		document.documentElement.dir = dir;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	const { loginState } = useAuthContext();
	const routeData = [
		{
			name: "Feed",
			url: "/",
			idFound: <Feed />,
			idFailed: <Navigate to="/login" />,
		},
		{
			name: "Login",
			url: "/login",
			idFound: <Navigate to="/" />,
			idFailed: <Login toastTR={toastTR} toastTC={toastTC}/>,

		},
		{
			name: "Create Event",
			url: "/create-event",
			idFound: <CreateEvent toastTC={toastTC} />,
			idFailed: <Navigate to="/login" />,
		},
		{
			name: "Update Event",
			url: "/update-event",
			idFound: <UpdateEvent toastTC={toastTC} />,
			idFailed: <Navigate to="/login" />,
		},
		{
			name: "Profile",
			url: "/profile",
			idFound: <Profile />,
			idFailed: <Navigate to="/login" />,
		},
		{
			name: "Register",
			url: "/register",
			idFound: <Navigate to="/" />,
			idFailed: <Register toastTR={toastTR} toastTC={toastTC} />,
		},
		{
			url: "/layout",
			isSimple: true,
			component: <Layout />,
		},
		{
			url: "*",
			isSimple: true,
			component: <h1>€404 Page not found</h1>,
		},
	];

	function routing(data) {
		return data.map((item, index) => {
			if (item.isSimple) {
				return <Route key={index} exact path={item.url} element={item.component} />;
			} else {
				return <Route key={index} exact path={item.url} element={loginState.id ? item.idFound : item.idFailed} />;
			}
		});
	}

	return (
<PrimeReactProvider value={{ unstyled: false }}>
<Toast ref={toastTC} position="top-center" /> 
<Toast ref={toastTR} position="top-right" /> 
		<div className="app">
			<BrowserRouter>
				<NotificationProvider>
					<NavBar />
					<Routes>{routing(routeData)}</Routes>
				</NotificationProvider>
			</BrowserRouter>
		</div>
		</PrimeReactProvider>
	);
}

export default App;
