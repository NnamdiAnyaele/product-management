import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	useEffect(() => {
		const userData = getCurrentUser();
		setUser(userData);
	}, []);

	const [user, setUser] = useState({});

	const state = {
		user,
	};
	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContext;
