import React, { useState } from 'react';
import HighLightModal from './AddHighlight';
import HighlightTable from './HighlightTable';
import { Button } from 'antd';

const Highlightsection = () => {
	const [ addModal, setAddModal ] = useState(false),
		[ updateModal, setUpdateModal ] = useState(false),
		[ modalValue, setModalValue ] = useState({});
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1 className="text-center">Welcome to Highlight</h1>
				<Button onClick={() => setAddModal(true)}>Add Highlights</Button>
				<HighlightTable modal={(val) => setUpdateModal(val)} initVal={(val) => setModalValue(val)} />
				<HighLightModal type="Addnew" openModal={addModal} closeModal={() => setAddModal(false)} />
				<HighLightModal
					type="Update"
					openModal={updateModal}
					closeModal={() => setUpdateModal(false)}
					initValue={modalValue}
				/>
			</div>
		</div>
	);
};

export default Highlightsection;
