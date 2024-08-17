import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Login, Clinic, Patient } from './pages';

import PrivateRoute from './shared/PrivateRoute.jsx';
import Layout from './shared/Layout.jsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppointmentsProvider } from './context/AppointmentsContext.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

const defaultTheme = createTheme({
	palette: {
		secondary: {
			main: '#305498',
		},
	},
});

const MainRouter = () => (
	<Router>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				element={
					<PrivateRoute>
						<Layout />
					</PrivateRoute>
				}
			>
				<Route path="/patient" element={<Patient />} />
				<Route path="/clinic" element={<Clinic />} />
			</Route>
			<Route path="/*" element={<Navigate to="/login" />} />
		</Routes>
	</Router>
);

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<UserContextProvider>
					<AppointmentsProvider>
						<MainRouter />
					</AppointmentsProvider>
				</UserContextProvider>
			</GoogleOAuthProvider>
		</ThemeProvider>
	);
}

export default App;
