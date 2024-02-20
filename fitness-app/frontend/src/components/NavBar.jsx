const NavBar = ({routes}) => {
    return (
        <nav id="nav-bar">
            <ul>
                {routes.map((route, index) =>
                    <li key={index}>
                        <a href={route.url}>{route.name}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
