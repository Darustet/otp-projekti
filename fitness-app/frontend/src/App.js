import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    const routes = [
        {
            name: 'Main',
            url: '/',
            component: <Home />
        },

        {
            name: 'Settings',
            url: '/',
            component: <Home />
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
