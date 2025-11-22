import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));

	const login = (jwt: string) => {
		localStorage.setItem('token', jwt);
		setToken(jwt);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, isAuth: !!token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
