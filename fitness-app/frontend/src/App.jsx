import React from "react";
import NavBar from "./components/NavBar";
import DomainRouting from './components/DomainRouting';
import TopBar from './components/TopBar';
import Home from "./pages/Home";
import Explore from './pages/Explore';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword/Forgot_password.jsx";
import { NotificationProvider } from "./NotificationsData/Notification";


import "./App.scss";

function App() {
    const routes = [
        {
            name: 'Home',
            url: '/',
            component: <Home />
        },
        {
            name: 'Explore',
            url: '/explore',
            component: <Explore />
        },
        {
            name: 'Create Event',
            url: '/create-event',
            component: <CreateEvent />
        },
        {
            name: 'Login',
            url: '/login',
            component: <Login />
        },
        {
            name: "Profile",
            url: "/profile",
            component: <Profile />
        },
        {
            name: "Settings",
            url: "/settings",
            component: <></>
        },
        {
            name: "Register",
            url: "/register",
            component: <Register />
        },
        {
            name: "Forgot Password",
            url: "/forgotpassword",
            component: <ForgotPassword />
        }
    ];

    return (
        < NotificationProvider >    
        <div>
            <TopBar />
            <NavBar routes={routes} />
            <DomainRouting routes={routes} />
        </div>
        </NotificationProvider>
    );
}

export default App;
