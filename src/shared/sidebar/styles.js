import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled } from '@mui/material';

export const StyledDrawer = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ theme, isMobile }) => ({
	width: '250px',
	transition: 'all 2s ease-in-out',
	'& .MuiDrawer-paper': {
		backgroundColor: '#1C1E2E',
		color: 'white',
		boxSixing: 'border-box',
		borderWidth: isMobile ? '2px' : 0,
		width: '250px',
	},
}));

export const StyledListItemButton = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
	backgroundColor: isActive ? theme.palette.secondary[300] : 'transparent',
	color: isActive ? theme.palette.primary[600] : theme.palette.secondary[100],
}));

export const StyledListItemIcon = styled(ListItemIcon, {
	shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
	marginLeft: '2rem',
	color: isActive ? theme.palette.secondary.light : 'white',
}));
