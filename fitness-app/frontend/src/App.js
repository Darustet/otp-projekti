import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
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
            url: '/explore'
        },
        {
            name: 'Create Event',
            url: '/CreateEvent',
            component: <CreateEvent />
        },
        {
            name: 'Login',
            url: '/login',
            component: <Login />
        },
    ]
    const routing = (routingItems) => {
        return routingItems.map((item, index) =>
            <Route
                key={index}
                path={item.url}
                element={item.component} />
        )
    }

    return (
        <div>
            <NavBar routes={routes} />
            <Router basename="/">
                <Routes>
                    {routing(routes)}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
