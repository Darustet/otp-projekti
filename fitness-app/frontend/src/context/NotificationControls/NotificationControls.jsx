import { useState, createContext } from "react";

export const NotificationContext = createContext(null);
const timePassed = (notification) => performance.now() - notification.startTime < notification.duration;

export default function NotificationControls(props) {
	const [notifications, setNotifications] = useState([]);

	return (
		<NotificationContext.Provider value={[addNotification, notifications, setNotifications]}>{props.children}</NotificationContext.Provider>
	);

	function addNotification(notification) {
		notification = { duration: 5000, title: "title", message: "message", ...notification };
		const keys = ["type", "title", "message", "duration"]; // Debugging errors
		keys.forEach((key) => key in notification || console.error("Undefined " + key));

		notification.startTime = performance.now();
		setTimeout(() => setNotifications((notifications) => notifications.filter(timePassed)), notification.duration);
		setNotifications((notifications) => [...notifications, notification]);
	}
}
