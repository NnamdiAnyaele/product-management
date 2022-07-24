import { useEffect } from "react";

const Logout = () => {
	useEffect(() => {
		localStorage.clear();
		window.location = "/";
	}, []);

	return null;
};

export default Logout;
