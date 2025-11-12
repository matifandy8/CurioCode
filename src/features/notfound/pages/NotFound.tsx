import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../app/layouts/MainLayout';

const NotFoundPage: React.FC = () => {
	return (
		<MainLayout>
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
		</MainLayout>
	);
};

export default NotFoundPage;
