import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import DomainRouting from './components/DomainRouting';
import Home from './pages/Home';
import Login from './pages/Login';
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
    ]

    return (
        <div>
            <NavBar routes={routes} />
            <DomainRouting routes={routes} />
        </div>
    );
}

export default App;
