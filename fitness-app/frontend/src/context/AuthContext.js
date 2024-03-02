import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContextDispatch = createContext(null);
const AuthContext = createContext(null);

export function useAuthContextDispatch() {
	return useContext(AuthContextDispatch);
}

export function useAuthContext() {
	return useContext(AuthContext);
}

const authReducer = (loginState, action) => {
	switch (action.type) {
		case "LOGIN":
			return { id: action._id, token: action.token };
		case "LOGOUT":
			return { id: null, token: null };
		default:
			return loginState;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [loginState, dispatch] = useReducer(authReducer, {
		id: null,
		token: null,
	});

	const checkToken = async () => {
		const token = localStorage.getItem("Token") || sessionStorage.getItem("Token") || "";
		dispatch({ type: "LOGIN", _id: token, token: token });
	};
	useEffect(() => {
		checkToken();
	}, []);
	console.log("AuthContext loginState:", loginState);

	return (
		<AuthContext.Provider value={{ loginState }}>
			<AuthContextDispatch.Provider value={{ dispatch }}>{children}</AuthContextDispatch.Provider>
		</AuthContext.Provider>
	);
};
