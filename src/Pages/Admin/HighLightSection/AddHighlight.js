import { Button, Form, Input, Space, Modal, Select, DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Axios from 'axios';
import { useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
const { TextArea } = Input;
const { Option } = Select;

const HighLightModal = ({ type, openModal, closeModal, initValue }) => {

	const { form } = Form.useForm();
	const [ initialValues, setInitialValues ] = useState({
			mallId: '',
			Id: '',
			startDate: '',
			endDate: '',
			highlight: ''
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

		const { allMallsData } = useSelector(({ highlightReducer }) => {
			return {
				allMallsData: highlightReducer.response.allMallsData
			}
		})

	const url = `http://192.168.68.123:3000/FindMyWay/api/test/${type === 'Addnew' ? 'add' : 'update'}-highlight`;
	//const url2 = 'http://192.168.68.123:3000/FindMyWay/api/test/update-highlights';

	const onFinish = (values) => {
		values['startDate'] = moment(values.startDate).format('YYYY-MM-DD');
		values['endDate'] = moment(values.endDate).format('YYYY-MM-DD');
		console.log('valuessss', { ...values });

		let payload = { ...values, Id: initialValues.Id };
		makeAPICall(payload);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const onChange = (value) => {
		setSelectedMallId(value);
	};

	const makeAPICall = async (values) => {
	  await	Axios({
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
			if (initValue !== undefined) {
				const { Id, START_DATE, END_DATE, HIGHLIGHTS } = initValue;
				setInitialValues({
					mallId: selectedMallId,
					Id: Id,
					startDate: moment(START_DATE),
					endDate: moment(END_DATE),
					highlight: HIGHLIGHTS
				});
			}
		},
		[ initValue, selectedMallId ]
	);

	return (
		<React.Fragment>
			<Modal
				title={type === 'Addnew' ? 'New Highlight' : 'Edit Highlight'}
				centered
				open={openModal}
				onOk={closeModal}
				onCancel={closeModal}
				footer={null}
				destroyOnClose={true}
				maskClosable={false}
			>
				<Space>
					<Form
						form={form}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						initialValues={initialValues}
					>
						<Form.Item
							label="Start Date"
							name="startDate"
							rules={[ { required: true, message: 'Please enter start date' } ]}
						>
							<DatePicker format="YYYY-MM-DD" allowClear={false} />
						</Form.Item>
						<Form.Item
							label="End Date"
							name="endDate"
							rules={[ { required: true, message: 'Please enter end date' } ]}
						>
							<DatePicker format="YYYY-MM-DD" allowClear={false} />
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
									{allMallsData && allMallsData.map((option) => (
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
							<TextArea rows={4} placeholder="Enter Message" />
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
