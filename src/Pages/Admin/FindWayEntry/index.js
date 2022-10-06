import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Components
import API_CALL from '../../../Services';

//Redux
import { getAllMallsData } from '../../../Services/AllMallsData/action';

//Others
import { Button, Select, Form, Input, Card, InputNumber, notification, Space } from 'antd';

const FindWayEntry = () => {
	const [ form ] = Form.useForm();
	const { Option } = Select;

	const layout = {
		labelCol: {
			span: 12
		},
		wrapperCol: {
			span: 16
		}
	};

	const [ selectedMallId, setSelectedMallId ] = useState(0),
		[ initialValues, setInitalValues ] = useState({
			mapId: '',
			source: '',
			destination: '',
			direction: '',
			distance: ''
		});
	const directions = [ 'Right', 'Left', 'Opposite', 'AdjacentRight', 'AdjacentLeft' ];
	const dispatch = useDispatch();

	const { allMallsData } = useSelector(({ mallDataReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData
		};
	});

	useEffect(() => {
		dispatch(getAllMallsData());
	}, []);

	const onChange = (value) => {
		setSelectedMallId(value === undefined ? 0 : value);
	};

	const onFinish = (values) => {
		let { source, destination, direction, distance } = values;
		let payload = {
			mapId: selectedMallId,
			mapData: [
				{
					source,
					destination,
					direction,
					distance
				}
			]
		};

		if (values !== undefined) {
			API_CALL({
				method: 'post',
				url: `add/building/structure`,
				data: payload,
				callback: ({ data, status }) => {
					if (status === 200) {
						form.resetFields();
						setInitalValues({
							mapId: '',
							source: '',
							destination: '',
							direction: '',
							distance: null
						});
						notification.success({
							message: data.data,
							placement: 'top'
						});
					}
				}
			});
		}
	};
	return (
		<div className="component-container">
			<Form.Item placeholder="Building">
				<Select
					allowClear
					showSearch
					placeholder="Select a Building"
					optionFilterProp="children"
					onChange={onChange}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
				>
					{allMallsData &&
						allMallsData.map((option) => (
							<Option key={option.ID} value={option.ID}>
								{option.MALL_NAMES}
							</Option>
						))}
				</Select>
			</Form.Item>
			{selectedMallId !== 0 && (
				<Card>
					<Form form={form} {...layout} onFinish={onFinish} autoComplete="off" initialValues={initialValues}>
						<Form.Item
							label="Source Name"
							name="source"
							rules={[ { required: true, message: 'Please enter source name' } ]}
						>
							<Input type="text" placeholder="Enter Source Name" />
						</Form.Item>
						<Form.Item
							label="Destination Name"
							name="destination"
							rules={[ { required: true, message: 'Please enter destination name' } ]}
						>
							<Input type="text" placeholder="Enter Destination Name" />
						</Form.Item>
						<Form.Item
							label="Direction"
							name="direction"
							rules={[ { required: true, message: 'Please enter direction name' } ]}
						>
							<Select
								allowClear
								showSearch
								style={{ width: '100%' }}
								placeholder="Select a Direction"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children.toLowerCase().includes(input.toLowerCase())}
							>
								{directions.map((option) => (
									<Option key={option} value={option}>
										{option}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							label="Distance"
							name="distance"
							rules={[
								{ required: true, message: 'Please enter distance meters' },
								{ type: 'number', message: 'please enter valid number' }
							]}
						>
							<InputNumber placeholder="Enter Distance meters" style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item className="highlightbtns">
							<Space>
								<Button className="fwbtn" type="secondary" onClick={() => form.resetFields()}>
									Cancel
								</Button>
								<Button className="fwbtn" type="primary" htmlType="submit">
									Save
								</Button>
							</Space>
						</Form.Item>
					</Form>
				</Card>
			)}
		</div>
	);
};

export default FindWayEntry;
