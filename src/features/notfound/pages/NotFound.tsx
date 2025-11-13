import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
	return (
			<div>
				<h1>404</h1>
				<h2>Page not found</h2>
				<p>
					The page you are looking for doesn't exist or has been moved.
				</p>
				<Link to="/">
					Go to Home
				</Link>
			</div>
	);
};

export default NotFoundPage;
