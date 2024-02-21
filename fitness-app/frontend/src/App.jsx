//import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import "./App.scss";
import DomainRouting from './components/DomainRouting';
import Explore from './pages/Explore';
import CreateEvent from './pages/CreateEvent';

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
