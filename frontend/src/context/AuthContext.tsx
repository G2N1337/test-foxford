import { createContext } from 'react';

export interface AuthContextProps {
	token: string | null;
	isAuth: boolean;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
