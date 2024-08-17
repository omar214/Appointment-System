import { useCallback, useMemo } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { STATUS } from '../data/index.js';
import moment from 'moment';
import { Container, Box, useTheme } from '@mui/material';
import Swal from 'sweetalert2';
import { Toast } from '../components/Toast/Toast.jsx';
import { useEvents } from '../context/EventsContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const localizer = momentLocalizer(moment);

export const Patient = () => {
	const theme = useTheme();
	const { events, addNewEvent } = useEvents();
	const [user] = useLocalStorage('user', {});

	const checkForOverlap = useCallback(
		({ start, end }) => {
			const isOverlapping = events.some(
				(event) =>
					(event.start <= start && start <= event.end) ||
					(event.start <= end && end <= event.end),
			);
			return isOverlapping;
		},
		[events],
	);

	const handleSelectSlot = useCallback(
		async ({ start, end }) => {
			const isOverlapping = checkForOverlap({ start, end });

			if (isOverlapping) {
				Toast.fire({
					icon: 'error',
					title: 'Sorry But this Slot is Already Reserved',
					timer: 2500,
				});
				return;
			}

			const { value: title } = await Swal.fire({
				title: 'Enter Appointment Reason',
				input: 'text',
				showCancelButton: true,
				inputValidator: (value) => {
					if (!value) return 'You need to write something!';
				},
			});
			if (!title) return;

			if (title) {
				addNewEvent({ start, end, title, ...user });
			}
		},
		[addNewEvent, user, checkForOverlap],
	);

	const handleSelectEvent = useCallback(
		(event) =>
			Toast.fire({
				icon: 'warning',
				title: `Reserved Slot for "${event.title}"`,
				timer: 2500,
			}),
		[],
	);

	const { defaultDate, scrollToTime } = useMemo(
		() => ({
			defaultDate: new Date(),
			scrollToTime: new Date(),
		}),
		[],
	);

	return (
		<Container maxWidth="xl">
			<Box sx={{ height: '600px' }}>
				<Calendar
					defaultDate={defaultDate}
					defaultView={Views.WEEK}
					views={['month', 'week', 'day']}
					events={events}
					localizer={localizer}
					selectable
					onSelectEvent={handleSelectEvent}
					onSelectSlot={handleSelectSlot}
					scrollToTime={scrollToTime}
					eventPropGetter={(event) => {
						return {
							style: {
								backgroundColor:
									event.status === STATUS.confirmed
										? theme.palette.success.main
										: event.status === STATUS.rejected
											? theme.palette.error.dark
											: theme.palette.warning.main,
								color: 'white',
							},
						};
					}}
					step={30}
				/>
			</Box>
		</Container>
	);
};
