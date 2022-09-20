import React from 'react';
import image from '../../assets/images/Mall.jpg';

import { Media } from 'reactstrap';
import { Button, Form, Select } from 'antd';

// const { Option } = Select;

const FindMyWay = () => {
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};

	const onSearch = (value) => {
		console.log('search:', value);
	};

	const option = [];
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1>Welcome to FindMyWay</h1>
			</div>
			<Media left className="mr-3 text-center">
				<img
					src={image}
					style={{
						width: '100px',
						height: '100px',
						borderRadius: '50%',
						border: `3px solid #f4f5fa`
					}}
					alt="dashboard"
					className=""
				/>
			</Media>
			<Form.Item>
				<Select
					showSearch
					placeholder="Select a Starting Place"
					optionFilterProp="children"
					onChange={onChange}
					onSearch={onSearch}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
				>
					{option}
				</Select>
				<Select
					showSearch
					placeholder="Select a Destination"
					optionFilterProp="children"
					onChange={onChange}
					onSearch={onSearch}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
				>
					{option}
				</Select>
				<Button>Find Path</Button>
			</Form.Item>
		</div>
	);
};

export default FindMyWay;
