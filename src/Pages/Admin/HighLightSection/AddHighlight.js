import { Button, Form, Input, Space, Modal } from 'antd';
import React, { useState, useEffect } from 'react';

import Axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
const { TextArea } = Input;

const HighLightModal = ({ type, openModal, closeModal, initValue }) => {
	const [ initialValues, setInitialValues ] = useState({
		startDate: '',
		endDate: '',
		highlights: ''
	});
	//console.log('initialValues', initialValues);
	const url = 'http://192.168.68.123:3000/FindMyWay/api/test/add-highlight';

	const onFinish = (values) => {
		makeAPICall(values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const makeAPICall = async (values) => {
		Axios({
			method: 'post',
			url: url,
			data: values
		})
			.then(({ data, status }) => {
				console.log('data: ', data, status);
				closeModal();
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	useEffect(
		() => {
			if (initValue) {
				console.log('initvalue', initValue);
				setInitialValues({
					startDate: initValue.START_DATE,
					endDate: initValue.END_DATE,
					highlights: initValue.HIGHLIGHTS
				});
			}
		},
		[ initValue ]
	);
	return (
		<React.Fragment>
			<Modal
				title={type === 'Addnew' ? 'New Highlight' : 'Edit Highlight'}
				centered
				open={!_isEmpty(initValue) && openModal}
				onOk={closeModal}
				onCancel={closeModal}
				footer={null}
			>
				<Space>
					<Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
						<Form.Item
							label="Start Date"
							name="startDate"
							rules={[ { required: true, message: 'Please enter start date' } ]}
						>
							<Input type="date" value={initialValues.startDate} />
						</Form.Item>
						<Form.Item
							label="End Date"
							name="endDate"
							rules={[ { required: true, message: 'Please enter end date' } ]}
						>
							<Input type="date" value={initialValues.endDate} />
						</Form.Item>
						<Form.Item
							label="Highlight Message"
							name="highlight"
							rules={[ { required: true, message: 'Please enter highlight message' } ]}
						>
							<TextArea rows={4} placeholder="Enter Message" value={initialValues.highlights} />
						</Form.Item>
						<Form.Item className="highlightbtns">
							<Space>
								<Button type="secondary" onClick={closeModal}>
									Cancel
								</Button>
								<Button type="primary" htmlType="submit">
									Save
								</Button>
							</Space>
						</Form.Item>
					</Form>
				</Space>
			</Modal>
		</React.Fragment>
	);
};

export default HighLightModal;
