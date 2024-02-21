import React from "react";
import NavBar from "./components/NavBar";
import DomainRouting from './components/DomainRouting';
import Home from "./pages/Home";
import Explore from './pages/Explore';
import CreateEvent from './pages/CreateEvent';
import Login from "./pages/Login/login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
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
        }
    ]

    return (
        <div>
            <NavBar routes={routes} />
            <DomainRouting routes={routes} />
        </div>
    );
}

export default App;
