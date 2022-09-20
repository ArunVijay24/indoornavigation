import React from 'react';
import image from '../../assets/images/Mall.jpg';

import { Media } from 'reactstrap';

const Dashboard = () => {
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1>Welcome to Dashboard</h1>
			</div>
			<Media className="text-center">
				<img
					src={image}
					style={{
						width: '100px',
						height: '100px',
						borderRadius: '50%',
						border: `3px solid #f4f5fa`
					}}
					alt="dashboard"
					className="shadow  p-3"
				/>
			</Media>
		</div>
	);
};

export default Dashboard;
