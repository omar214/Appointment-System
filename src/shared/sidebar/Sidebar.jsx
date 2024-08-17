import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Styling imports
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
// Icons imports
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import ImageIcon from '@mui/icons-material/Image';
import MenuIcon from '@mui/icons-material/Menu';
import {
	StyledDrawer,
	StyledListItemButton,
	StyledListItemIcon,
} from './styles.js';

export const Sidebar = ({ toggleSidebar, isMobile, isSidebarOpen }) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const isClinicAdmin = localStorage.getItem('isClinicAdmin') === 'true';

	const tabs = isClinicAdmin ? navItems.clinic : navItems.patient;

	useEffect(() => {
		const url = pathname.split('/')[1];
		setActive(url);
	}, [pathname]);

	const handleClick = (url) => {
		setActive(url);
		navigate(url);
	};

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<StyledDrawer
					open={isSidebarOpen}
					onClose={toggleSidebar}
					variant="persistent"
					anchor="left"
				>
					<Box width="100%">
						<Box
							sx={{
								margin: '1.5rem 2rem 2rem 3rem',
								mt: '1.5rem',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
								color={theme.palette.secondary.main}
							>
								{isMobile && (
									<IconButton onClick={toggleSidebar}>
										<MenuIcon sx={{ color: 'white' }} />
									</IconButton>
								)}
							</Box>
						</Box>
						<List>
							{tabs.map((item) => {
								if (!item.icon) {
									return (
										<Typography
											key={item.id}
											sx={{ margin: '2.25rem 0 1rem 3rem' }}
										>
											{item.text}
										</Typography>
									);
								}
								return (
									<ListItem key={item.id} disablePadding>
										<StyledListItemButton
											onClick={() => handleClick(item.url)}
											isActive={active === item.url}
										>
											<StyledListItemIcon isActive={active === item.url}>
												{item.icon}
											</StyledListItemIcon>
											<ListItemText primary={item.text} />
											{active === item.url && (
												<ChevronRightOutlined sx={{ ml: 'auto' }} />
											)}
										</StyledListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
				</StyledDrawer>
			)}
		</Box>
	);
};

const navItems = {
	clinic: [
		{
			id: 1,
			text: 'Clinic',
			url: 'clinic',
			icon: <ImageIcon />,
		},
	],
	patient: [
		{
			id: 2,
			text: 'Patient',
			url: 'patient',
			icon: <InventoryIcon />,
		},
	],
};
