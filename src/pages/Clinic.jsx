import { useCallback, useMemo } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { STATUS } from '../data/index.js';
import moment from 'moment';
import { Box, Container, useTheme } from '@mui/material';
import Swal from 'sweetalert2';
import { Toast } from '../components/Toast/Toast.jsx';
import { useEvents } from '../context/EventsContext.jsx';

const localizer = momentLocalizer(moment);

export const Clinic = () => {
	const theme = useTheme();
	const { events, setEventStatus } = useEvents();

	const handleSelectEvent = useCallback(
		async (event) => {
			if (event.status === STATUS.confirmed) {
				Toast.fire({
					icon: 'success',
					title: `Event "${event.title}" Already Reserved`,
					timer: 2500,
				});
				return;
			}

			if (event.status === STATUS.rejected) {
				Toast.fire({
					icon: 'error',
					title: `Event "${event.title}" Already Declined`,
					timer: 2500,
				});
				return;
			}

			const result = await Swal.fire({
				title: `Approve "${event.title}" or Decline? `,
				showCancelButton: true,
				confirmButtonText: 'Confirm',
				cancelButtonText: 'Reject',
			});

			// in case user cancelled the dialog or clicked outside
			if (!result.isConfirmed && result.dismiss !== 'cancel') return;

			const status = result.isConfirmed ? STATUS.confirmed : STATUS.rejected;
			setEventStatus(event.id, status);

			Toast.fire({
				icon: 'success',
				title: `Event "${event.title}" ${status === STATUS.confirmed ? 'Confirmed' : 'Rejected'} Successfully`,
				timer: 2500,
			});
		},
		[setEventStatus],
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
					onSelectEvent={handleSelectEvent}
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
				/>
			</Box>
		</Container>
	);
};
