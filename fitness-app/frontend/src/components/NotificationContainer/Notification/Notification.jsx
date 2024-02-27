import style from "./Notification.module.scss";

export default function Notification({ notification, onClose }) {
	return (
		<div className={`${style.notification} ${style[notification.type]}`}>
			<div className={style.header}>
				<p className={style.title}>{notification.title}</p>
				<button onClick={() => onClose(notification)} className={style["close-button"]} />
			</div>
			<p className={style.description}>{notification.message}</p>
		</div>
	);
}
