import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';

const DomainRouting = ({routes}) => {
    return <Router basename="/">
        <Routes>
            {routes.map((item, index) =>
                <Route
                    key={index}
                    path={item.url}
                    element={item.component}/>,
            )}
        </Routes>
    </Router>
}

export default DomainRouting;
