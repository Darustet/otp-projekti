import styles from "./PostEventIcon.module.scss";
import { useNavigate } from "react-router-dom";

const PostEventIcon = () => {
    const navigate = useNavigate();
    return (
        <svg onClick={()=>{navigate("/create-event")}} className={styles["newPost"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
    );
}

export default PostEventIcon;