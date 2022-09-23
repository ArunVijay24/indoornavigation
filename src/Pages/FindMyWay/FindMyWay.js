import React, { useState } from 'react';

import { Button, Form, Select, Space } from 'antd';

const { Option } = Select;
const FindMyWay = () => {
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};

	const onSearch = (value) => {
		console.log('search:', value);
	};
	const [ fromTo, setFromTo ] = useState({});
	const onFinish = (values) => {
		setFromTo(values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	console.log(fromTo);
	const options = [ 'KFC', 'Puma', 'Bata' ];
	return (
		<div className="content">
			<div className="mall">
				<h1 className="hlheader">Welcome to FindMyWay</h1>

				<Form
					initialValues={{
						remember: true
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className="fmwform"
				>
					<Form.Item
						label="Starting Place"
						name="startingplace"
						rules={[ { required: true, message: 'Please enter starting place' } ]}
					>
						<Select
							showSearch
							placeholder="Select a Starting Place"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().includes(input.toLowerCase())}
						>
							{options.map((option) => <Option key={option}>{option}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item
						label="Ending Place"
						name="endingplace"
						rules={[ { required: true, message: 'Please enter ending place' } ]}
					>
						<Select
							showSearch
							placeholder="Select a Destination"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().includes(input.toLowerCase())}
						>
							{options.map((option) => <Option key={option}>{option}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Find Path
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div className="site-layout-content" />
		</div>
	);
};

export default FindMyWay;
