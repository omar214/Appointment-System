import { Box, useMediaQuery } from '@mui/material';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './sidebar/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Layout = ({ ...props }) => {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<Box
			display={isMobile ? 'block' : 'flex'}
			width="100%"
			height="100%"
			{...props}
		>
			<Sidebar
				isMobile={isMobile}
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
			/>
			<Box flexGrow={1}>
				<Navbar mb={2} toggleSidebar={toggleSidebar} />
				<Box margin="1.5rem 2.5rem">
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default Layout;
