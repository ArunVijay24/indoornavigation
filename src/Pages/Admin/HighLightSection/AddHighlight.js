import { Button, Form, Input, Space, Modal, Select } from 'antd';
import React, { useState, useEffect } from 'react';

import Axios from 'axios';
import { useSelector } from 'react-redux';
// import _isEmpty from 'lodash/isEmpty';
const { TextArea } = Input;
const { Option } = Select;

const HighLightModal = ({ type, openModal, closeModal, initValue }) => {
	const [ initialValues, setInitialValues ] = useState({
			mallId: '',
			startDate: '',
			endDate: '',
			highlights: ''
		}),
		[ malls, setMalls ] = useState([
			{
				ID: 1,
				MALL_NAMES: 'Phoenix-Mall'
			},
			{
				ID: 2,
				MALL_NAMES: 'Nexus-Mall'
			},
			{
				ID: 3,
				MALL_NAMES: 'Marina-Mall'
			},
			{
				ID: 4,
				MALL_NAMES: 'EA-Mall'
			}
		]),
		[ selectedMallId, setSelectedMallId ] = useState();

	const AllMalls = useSelector((state) => state.allMalls);

	console.log('AllMalls', AllMalls);

	const url = 'http://192.168.0.164:3000/FindMyWay/api/test/add-highlight';

	const mallsurl = 'http://192.168.0.164:3000/FindMyWay/api/test/malls';

	const onFinish = (values) => {
		makeAPICall(values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const onChange = (value) => {
		setSelectedMallId(value);
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
				setInitialValues({
					mallId: selectedMallId,
					startDate: initValue.START_DATE,
					endDate: initValue.END_DATE,
					highlights: initValue.HIGHLIGHTS
				});
			}
		},
		[ initValue, selectedMallId ]
	);

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

	return (
		<React.Fragment>
			<Modal
				title={type === 'Addnew' ? 'New Highlight' : 'Edit Highlight'}
				centered
				open={openModal}
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
						{type === 'Addnew' && (
							<Form.Item
								label="Mall"
								name="mallId"
								rules={[ { required: true, message: 'Please select the mall' } ]}
							>
								<Select
									showSearch
									placeholder="Select a Mall"
									optionFilterProp="children"
									onChange={onChange}
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())}
								>
									{malls.map((option) => (
										<Option key={option.ID} value={option.ID}>
											{option.MALL_NAMES}
										</Option>
									))}
								</Select>
							</Form.Item>
						)}
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
