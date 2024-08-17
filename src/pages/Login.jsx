import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext.jsx';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Omar214
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export const Login = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [isClinicAdmin, setIsClinicAdmin] = useState(false);
	const { user, setUser } = useUser();

	useEffect(() => {
		if (!user.isAuthenticated) return;

		navigate(isClinicAdmin ? '/clinic' : '/patient', {
			replace: true,
		});
	}, [user.isAuthenticated, navigate, isClinicAdmin]);

	const onSuccessfulLogin = (m) => {
		const decodedInfo = jwtDecode(m.credential);
		const user = {
			email: decodedInfo.email,
			name: decodedInfo.name,
			picture: decodedInfo.picture,
			isClinicAdmin,
			isAuthenticated: true,
		};

		setUser(user);

		navigate(isClinicAdmin ? '/clinic' : '/patient', { replace: true });
	};

	const onError = () => {
		console.error('Error logging in');
		Swal.fire({
			title: 'Error Login',
			icon: 'error',
		});
	};

	return (
		<Box
			component="main"
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					boxShadow: 3,
					padding: 5,
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" textAlign="center">
						Login
					</Typography>
					<Box
						component="form"
						noValidate
						mt={1}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<FormControlLabel
							control={
								<Checkbox
									value="remember"
									color="primary"
									checked={isClinicAdmin}
									onChange={(event) => setIsClinicAdmin(event.target.checked)}
								/>
							}
							label="Login as Clinic Admin"
							sx={{ mt: 2 }}
						/>
						<Box mt={2}>
							<GoogleLogin
								onSuccess={onSuccessfulLogin}
								onError={onError}
								locale="en"
							/>
						</Box>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</Box>
	);
};
