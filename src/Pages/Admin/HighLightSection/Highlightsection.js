import { Button } from 'antd';
import React from 'react';
import AddHighLight from './AddHighlight';

const Highlightsection = () => {
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1 className="text-center">Welcome to Highlight</h1>
				<AddHighLight />
			</div>
		</div>
	);
};

export default Highlightsection;
