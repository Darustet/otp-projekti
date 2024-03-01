import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationControls from "./context/NotificationControls/NotificationControls";
import AuthenticationControls from "./context/AuthenticationContext/AuthenticationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<NotificationControls>
			<AuthenticationControls>
				<App />
			</AuthenticationControls>
		</NotificationControls>
		<App />
	</React.StrictMode>
);
