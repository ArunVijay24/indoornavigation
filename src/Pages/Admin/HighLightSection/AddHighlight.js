import { Button, Form, Input, Space, Modal } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

const AddHighLight = () => {
	const [ open, setOpen ] = useState(false),
		[ highlights, setHighlights ] = useState({});
	const onFinish = (values) => {
		setHighlights(values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	console.log(highlights);
	return (
		<div>
			<Button onClick={() => setOpen(true)}>Add Highlights</Button>

			<Modal
				title="New Highlight Message"
				centered
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				footer={null}
			>
				<Space>
					<Form
						initialValues={{
							remember: true
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Start Date"
							name="startdate"
							rules={[ { required: true, message: 'Please enter start date' } ]}
						>
							<Input type="date" />
						</Form.Item>
						<Form.Item
							label="End Date"
							name="enddate"
							rules={[ { required: true, message: 'Please enter end date' } ]}
						>
							<Input type="date" />
						</Form.Item>
						<Form.Item
							label="Highlight Message"
							name="highlightmessage"
							rules={[ { required: true, message: 'Please enter highlight message' } ]}
						>
							<TextArea rows={4} placeholder="Enter Highlight Message" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Space>
			</Modal>
		</div>
	);
};

export default AddHighLight;
