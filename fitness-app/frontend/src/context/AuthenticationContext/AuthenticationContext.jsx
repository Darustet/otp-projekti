import { createContext, useEffect, useReducer, useState } from "react";
import { api } from "../../utils/api";

export const AuthenticationContext = createContext(null);

const initialState = {
	isAuthenticated: false,
	callback: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, isAuthenticated: true, user: action.user, rememberPassword: action.rememberPassword ?? false };
		case "logout": {
			sessionStorage.clear();
			return { ...state, isAuthenticated: false, user: null };
		}
		case "update":
			return { ...state, user: action.user };
		case "callback":
			return { ...state, callback: action.callback };
		default:
			return Error("Invalid action type");
	}
}

export default function AuthenticationControls(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [authentication, dispatchAuthentication] = useReducer(reducer, initialState);

	useEffect(() => {
		// const fetchData = async () => {
		// 	const { data, status } = await api.getAuthUserInfo();
		// 	setIsLoading(false);
		// 	if (status !== 200) return;
		// 	dispatchAuthentication({ type: "login", user: data, rememberPassword: true });
		// };
		// fetchData();
	}, []);

	async function updateAuthentication() {
		const { data, status } = await api.getAuthUserInfo();
		if (status !== 200) return;

		dispatchAuthentication({ type: "update", user: data });
	}

	if (isLoading) return null;
	return <AuthenticationContext.Provider value={{ authentication, dispatchAuthentication, updateAuthentication }} {...props} />;
}
