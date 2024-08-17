import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = function ({ children }) {
	const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PrivateRoute;
