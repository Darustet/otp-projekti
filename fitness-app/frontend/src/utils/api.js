import axios from "axios";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

export const socket = socketIO("http://localhost:4000", {
	auth: (token) => {
		token({ token: accessToken });
	},
});

let refreshPromise = null;
let refreshToken = null;
let accessToken = null;

const apiObject = {
	login: async ({ password, userTag, rememberPassword }, callback) => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/auth/login",
				{ password, userTag, rememberPassword },
				{ withCredentials: true }
			);

			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
			refreshToken = response.data.refreshToken;
			accessToken = response.data.accessToken;
			socket.disconnect();
			socket.connect();

			if (callback) return callback(response) ?? response;
			return response;
		} catch (err) {
			console.error(err);
			return err.response;
		}
	},
	refreshToken: async () => {
		try {
			refreshPromise ??= axios.post("http://localhost:4000/api/auth/refresh", { token: refreshToken }, { withCredentials: true });
			const response = await refreshPromise;

			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
			if (!accessToken) socket.connect();
			accessToken = response.data.accessToken;
			setTimeout(() => (refreshPromise = null), 1000);
			return response;
		} catch (err) {
			console.log(err);
			return err.response;
		}
	},
	logout: async () => {
		try {
			const response = await axios.post("http://localhost:4000/api/auth/logout", { token: refreshToken }, { withCredentials: true });
			delete axios.defaults.headers.common["Authorization"];
			accessToken = refreshToken = null;
			socket.disconnect();
			socket.connect();

			return response;
		} catch (err) {
			console.error(err);
			return err.response;
		}
	},

	users: async () => {
		const response = await axios.get("http://localhost:4000/api/users");
		return response;
	},
	getUserById: async (userId) => {
		const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
		return response;
	},
	getUserByUserTag: async (userTag) => {
		const response = await axios.get(`http://localhost:4000/api/users/userTag/${userTag}`);
		return response;
	},

	getAuthUserInfo: requiresAuth(async () => {
		const response = await axios.get("http://localhost:4000/api/auth/user");
		return response;
	}),
	updateAuthUser: requiresAuth(async ({ username, userTag, email, password }) => {
		const response = await axios.patch("http://localhost:4000/api/profile", {
			username,
			userTag,
			email,
			password,
		});
		return response;
	}),

	usePostStats: (id, props) => {
		const [value] = useSocket(`post/${id}`);
		const [dislikes, setDislikes] = useState(props?.dislikes ?? 0);
		const [likes, setLikes] = useState(props?.likes ?? 0);
		const [comments, setComments] = useState(props?.comments ?? 0);

		useEffect(() => {
			if (!value) return;

			setLikes((v) => value.likes ?? v);
			setDislikes((v) => value.dislikes ?? v);
			setComments((v) => value.comments ?? v);
		}, [value]);

		return { ...value, likes, dislikes, comments, setDislikes, setLikes, setComments };
	},
	useMessage: (baseId) => {
		const [message, setUrl] = useSocket(`message/${baseId}`);
		const updateGroup = (id) => setUrl(`message/${id}`);

		return [message, updateGroup];
	},
};

export const api = new Proxy(apiObject, {
	get: (target, prop) => {
		const callback = target[prop];

		if (callback.constructor.name === "AsyncFunction") {
			return async (...settings) => {
				try {
					return await callback(...settings);
				} catch (err) {
					return err.response || err || { error: "Unknown error" };
				}
			};
		} else {
			return (...settings) => {
				try {
					return callback(...settings);
				} catch (err) {
					return err.response || err || { error: "Unknown error" };
				}
			};
		}
	},
});

function requiresAuth(callback) {
	return async function (...settings) {
		try {
			const response = await callback(...settings);
			return response;
		} catch (err) {
			if (err.response?.status === 403 || !accessToken) {
				const response = await api.refreshToken();
				if (response?.status === 200) {
					return await callback(...settings);
				} else {
					return response;
				}
			} else {
				return err.response;
			}
		}
	};
}

function useSocket(baseUrl) {
	const [data, setData] = useState(null);
	const [url, setUrl] = useState(baseUrl);

	useEffect(() => {
		const onData = (result) => setData(result);
		socket.on(url, onData);

		return () => socket.off(url, onData);
	}, [url]);

	return [data, setUrl];
}
