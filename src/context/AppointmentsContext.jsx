/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react';
import { currId, events } from '../data';

const AppointmentsContext = createContext({
	appointments: [],
	setAppointments: () => {},
	addNewAppointment: (appointment) => {},
	setAppointmentStatus: (id, status) => {},
	setAppointmentProperties: (id, properties) => {},
});

export const AppointmentsProvider = ({ children }) => {
	const [data, setData] = useState(events);

	const addNewAppointment = (newEvent) => {
		setData((prev) => [...prev, { ...newEvent, id: currId() }]);
	};

	const setAppointmentStatus = (id, status) => {
		setData((prev) =>
			prev.map((event) => (event.id === id ? { ...event, status } : event)),
		);
	};

	const setAppointmentProperties = (id, properties) => {
		setData((prev) =>
			prev.map((event) =>
				event.id === id ? { ...event, ...properties } : event,
			),
		);
	};

	return (
		<AppointmentsContext.Provider
			value={{
				appointments: data,
				setAppointments: setData,
				addNewAppointment,
				setAppointmentStatus,
				setAppointmentProperties,
			}}
		>
			{children}
		</AppointmentsContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppointments = () => {
	const context = useContext(AppointmentsContext);
	if (!context) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return context;
};
