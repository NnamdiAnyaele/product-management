import axios from "axios";

const userKey = "user";

export async function login(payload) {
	const url = `/api/login`;
	const { data } = await axios.post(url, payload);
	return data;
}

export async function signup(payload) {
	const url = `/api/register`;
	const { data } = await axios.post(url, payload);
	return data;
}

export function getCurrentUser() {
	try {
		const user = localStorage.getItem(userKey);
		return JSON.parse(user);
	} catch (ex) {
		return {};
	}
}
