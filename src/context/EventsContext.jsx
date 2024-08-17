/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react';
import { currId, events } from '../data';

const EventsContext = createContext({
	events: [],
	setEvents: () => {},
	addNewEvent: (event) => {},
	setEventStatus: (id, status) => {},
	setEventProperties: (id, properties) => {},
});

export const EventsProvider = ({ children }) => {
	const [data, setData] = useState(events);

	const addNewEvent = (newEvent) => {
		setData((prev) => [...prev, { ...newEvent, id: currId() }]);
	};

	const setEventStatus = (id, status) => {
		setData((prev) =>
			prev.map((event) => (event.id === id ? { ...event, status } : event)),
		);
	};

	const setEventProperties = (id, properties) => {
		setData((prev) =>
			prev.map((event) =>
				event.id === id ? { ...event, ...properties } : event,
			),
		);
	};

	return (
		<EventsContext.Provider
			value={{
				events: data,
				setEvents: setData,
				addNewEvent,
				setEventStatus,
				setEventProperties,
			}}
		>
			{children}
		</EventsContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEvents = () => {
	const context = useContext(EventsContext);
	if (!context) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return context;
};
