import React from 'react';
import AddHighLight from './AddHighlight';
import HighlightTable from './HighlightTable';

const Highlightsection = () => {
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1 className="text-center">Welcome to Highlight</h1>
				<AddHighLight />
				<HighlightTable />
			</div>
		</div>
	);
};

export default Highlightsection;
