import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext.js";
import { LanguageProvider } from "./context/LanguageContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<LanguageProvider>
				<React.Suspense fallback={<div>Loading...</div>}>
					<App />
				</React.Suspense>
			</LanguageProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
