import React, { useState, useEffect } from 'react';
import HighLightModal from './AddHighlight';
import HighlightTable from './HighlightTable';
import { Button, Select, Space } from 'antd';
import Axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

const { Option } = Select;

const Highlightsection = () => {
	const [ addModal, setAddModal ] = useState(false),
		[ updateModal, setUpdateModal ] = useState(false),
		[ modalValue, setModalValue ] = useState({}),
		[ mallData, setMallData ] = useState([]),
		[ malls, setMalls ] = useState([]);

	useEffect(() => {
		Axios({
			method: 'get',
			url: mallsurl
		})
			.then(({ data, status }) => {
				setMalls(data.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	}, []);
	const mallsurl = 'http://192.168.0.164:3000/FindMyWay/api/test/malls';

	const getbymallsurl = 'http://192.168.0.164:3000/FindMyWay/api/test/highlightsByMall';
	const onChange = (value) => {
		Axios({
			method: 'get',
			url: getbymallsurl,
			params: { id: value }
		})
			.then(({ data, status }) => {
				setMallData(data.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1 className="text-center">Welcome to Highlight</h1>
				<Space>
					<Button onClick={() => setAddModal(true)}>Add Highlights</Button>
					<Select
						showSearch
						placeholder="Select a Mall"
						optionFilterProp="children"
						onChange={onChange}
						filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					>
						{malls.map((option) => (
							<Option key={option.ID} value={option.ID}>
								{option.MALL_NAMES}
							</Option>
						))}
					</Select>
				</Space>
				<HighlightTable
					modal={(val) => setUpdateModal(val)}
					initVal={(val) => setModalValue(val)}
					data={mallData}
				/>
				<HighLightModal type="Addnew" openModal={addModal} closeModal={() => setAddModal(false)} />
				{!_isEmpty(modalValue) && (
					<HighLightModal
						type="Update"
						openModal={updateModal}
						closeModal={() => setUpdateModal(false)}
						initValue={modalValue}
					/>
				)}
			</div>
		</div>
	);
};

export default Highlightsection;
