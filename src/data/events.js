const now = new Date();

export const STATUS = {
	pending: 'pending',
	confirmed: 'confirmed',
	rejected: 'rejected',
};

export const currId = (() => {
	let id = 1;

	return () => id++;
})();

export const events = [
	{
		id: currId(),
		title: 'Event 1',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2),
		status: STATUS.pending,
	},
	{
		id: currId(),
		title: 'Event 2',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3),
		status: STATUS.pending,
	},
	{
		id: currId(),
		title: 'Event 3',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 3),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 4),
		status: STATUS.confirmed,
	},
	{
		id: currId(),
		title: 'Event 4',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 7),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8),
		status: STATUS.confirmed,
	},

	{
		id: currId(),
		title: 'Event 5',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 5),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 6),
		status: STATUS.confirmed,
	},

	{
		id: currId(),
		title: 'Event 6',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 6),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 7),
		status: STATUS.rejected,
	},

	{
		id: currId(),
		title: 'Event 7',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 7),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 8),
		status: STATUS.rejected,
	},

	{
		id: currId(),
		title: 'Event 8',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 8),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 9),
		status: STATUS.confirmed,
	},

	{
		id: currId(),
		title: 'Event 9',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 9),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 10),
		status: STATUS.pending,
	},

	{
		id: currId(),
		title: 'Event 10',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 10),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 11),
		status: STATUS.rejected,
	},

	{
		id: currId(),
		title: 'Event 11',
		start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11),
		end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12),
		status: STATUS.confirmed,
	},
];
