import React from 'react';
import { Button, Select, Space } from 'antd';

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
			<Space>
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
			</Space>
		</div>
	);
};

export default FindMyWay;
