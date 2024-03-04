import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Layout.module.scss";

const Layout = () => {
    const { loginState } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation(); // useLocation hook to get the current location
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (loginState.id && isAuthPage) {
        navigate('/');
        return null;
    }
    
    return (
        <div className={style["page-content"]}>
            {!isAuthPage && <NavBar />} // Conditionally render NavBar based on the route
            {loginState.id ? <Outlet /> : <Navigate to="/login" />}
        </div>
    );
};

export default Layout;
