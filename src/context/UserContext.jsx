/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react';

const INITIAL_USER = {
	email: '',
	name: '',
	picture: '',
	isClinicAdmin: false,
	isAuthenticated: false,
};

const UserContext = createContext({
	user: INITIAL_USER,
	setUser: (user) => {},
	resetUser: () => {},
});

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const resetUser = () => {
		setUser(INITIAL_USER);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				resetUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return context;
};
