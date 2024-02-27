import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext";
import { api } from "../../utils/api";
import style from "./Authentication.module.scss";
import { NotificationContext } from "../../context/NotificationControls/NotificationControls";


export default function Authentication() {
	const [addNotification] = useContext(NotificationContext);
	const { authentication, dispatchAuthentication } = useContext(AuthenticationContext);
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { status } = await api.login({
			userTag: authentication.user.userTag,
			password: password,
			rememberPassword: authentication.rememberPassword,
		});

		if (status !== 200) {
			setPassword("");
			return addNotification({ type: "error", message: "Wrong password", title: "Authentication failed", duration: 2000 });
		}

		authentication.callback?.();

		dispatchAuthentication({ type: "callback", callback: null });
		addNotification({ type: "success", message: "Authentication successful", title: "Authentication successful", duration: 2000 });
	};

	useEffect(() => {});

	return (
		<form action="" onSubmit={handleSubmit} className={style["authentication-form"]}>
			<div>
				<h1>Authentication</h1>
				<p>Enter your password</p>
			</div>
			<div className={style["profile-info"]}>
				
				<span className={style.username}>{authentication.user?.username}</span>
				
			</div>
			<div className={style["footer"]}>
				<input type="password" placeholder="Password" value={password} onInput={(e) => setPassword(e.target.value)} />
			
			</div>
		</form>
	);
}
