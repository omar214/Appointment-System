import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '../context/UserContext.jsx';

const PrivateRoute = function ({ children }) {
	const {
		user: { isAuthenticated },
	} = useUser();

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PrivateRoute;
