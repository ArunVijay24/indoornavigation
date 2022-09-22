import React, { useState, useEffect } from 'react';
import imageurl from '../../assets/images/Mall.jpg';

import { Media } from 'reactstrap';
import { Card, Select, Space } from 'antd';
import Axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
const { Option } = Select;

const Dashboard = () => {
	const [ malls, setMalls ] = useState([]),
		[ mallData, setMallData ] = useState([]),
		[ image, setImage ] = useState(imageurl);

	const mallsurl = 'http://192.168.68.123:3000/FindMyWay/api/test/malls';
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

	const getbymallsurl = 'http://192.168.68.123:3000/FindMyWay/api/test/highlightsByMall';
	const onChange = (value) => {
		let img = malls.filter((mall) => mall.ID === value);
		setImage(img[0].LINKS);
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
				<h1>Welcome to Dashboard</h1>
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
				<Space>
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
				</Space>
			</div>
			<Space>
				{mallData.map((mall) => (
					<Card key={mall.ID} extra={<a href="#">More</a>} style={{ width: 300, height: 200 }}>
						<h3>{mall.HIGHLIGHTS}</h3>
					</Card>
				))}
			</Space>
		</div>
	);
};

export default Dashboard;
