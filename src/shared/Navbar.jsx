import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Navbar = ({ toggleSidebar }) => {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();
	const [user] = useLocalStorage('user', { email: '', name: '', picture: '' });
	const isClinic = localStorage.getItem('isClinicAdmin') === 'true';

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		googleLogout();
		localStorage.clear();
		navigate('/login', { replace: true });
	};

	return (
		<AppBar position="static" sx={{ background: '#1C1E2E' }}>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						paddingX: {
							xs: 0,
							md: 2,
						},
					}}
				>
					<IconButton onClick={toggleSidebar}>
						<MenuIcon sx={{ color: 'white' }} />
					</IconButton>

					<Typography
						variant="h5"
						noWrap
						sx={{
							mr: 2,
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						{isClinic ? 'Clinic' : 'Patient'}
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title={user.name}>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar src={user.picture}>
									<PersonIcon />
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleLogout}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
