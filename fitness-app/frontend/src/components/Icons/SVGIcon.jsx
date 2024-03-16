import styles from './Icons.module.scss';
import {useNavigate} from 'react-router-dom';
import {useAuthContextDispatch} from '../../context/AuthContext';

export default function SVGIcon(props) {
    const navigate = useNavigate(),
        {dispatch} = useAuthContextDispatch();
    function logoutDispatch() {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("Token");
    }

    if(props.type === "navigate") {
        return <svg onClick={() => navigate(props.navUrl)}
            className={styles[props.styleClass]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill={props.currentColor}>
            <path d={props.pathD}></path>
        </svg>
    } else if (props.type === "logout") {
        return <svg onClick={logoutDispatch}
                    className={styles[props.styleClass]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill={props.currentColor}>
            <path d={props.pathD}></path>
        </svg>
    }
};
