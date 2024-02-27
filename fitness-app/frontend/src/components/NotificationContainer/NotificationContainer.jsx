import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationControls/NotificationControls";
import Notification from "./Notification/Notification";
import style from "./NotificationContainer.module.scss";

export default function NotificationContainer() {
	const [ addNotification, notifications, setNotifications] = useContext(NotificationContext);
	const closeButton = (notification) => setNotifications((notifications) => notifications.filter((n) => n !== notification));

	return (
		<div className={style["notifications-container"]}>
			{notifications.map((notification) => (
				<Notification notification={notification} onClose={closeButton} key={notification.startTime + "-" + notification.duration} />
			))}
		</div>
	);
}
