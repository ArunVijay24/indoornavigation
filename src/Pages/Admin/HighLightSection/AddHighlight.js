import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { getShopId } from '../../../Services/HighlightByShopId/action';
import {  getHighlightTableData } from '../../../Services/AdminHighlight/action';
import API_CALL from '../../../Services';

//Others
import { Button, Form, Input, Space, Modal, Select, DatePicker, notification } from 'antd';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';


const HighLightModal = ({ type, openModal, closeModal, initValue }) => {

	const { TextArea } = Input;
	const { Option } = Select;
	const { form } = Form.useForm();
	const dispatch = useDispatch();

	const layout = {
		labelCol: {
			span: 12
		},
		wrapperCol: {
			span: 16
		}
	};

	const [initialValues, setInitialValues] = useState({
		mallId: '',
		shopId: '',
		Id: '',
		startDate: '',
		endDate: '',
		highlight: ''
	}),
		[selectedMallId, setSelectedMallId] = useState(),
		[selectedShopId, setSelectedShopId] = useState(),
		[sd, setSd] = useState(),
		[ed, setEd] = useState();

	const { allMallsData, shopDatas } = useSelector(({ mallDataReducer, shopReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData,
			shopDatas: shopReducer.response.shopDatas,
		};
	});

	const onFinish = (values) => {
		values['startDate'] = moment(values.startDate).format('YYYY-MM-DD');
		values['endDate'] = moment(values.endDate).format('YYYY-MM-DD');
		let payload = { ...values, Id: initialValues.Id };
		closeModal();
		API_CALL({
			method: 'post',
			url: `${type === 'Addnew' ? 'add' : 'update'}-highlight`,
			data: payload,
			callback: ({ data, status }) => {
				if (status === 200) {
					notification.success({
						message: data.data,
						placement: 'top'
					});
					dispatch(getHighlightTableData())
				}
			}
		})
	};

	const onChange = (value) => {
		setSelectedMallId(value);
		dispatch(getShopId(value));
	};

	const onChange2 = (value) => {
		setSelectedShopId(value);
	};

	useEffect(
		() => {
			if (initValue) {
				const { Id, START_DATE, END_DATE, HIGHLIGHTS } = initValue;
				setInitialValues({
					mallId: selectedMallId,
					shopId: selectedShopId,
					Id: Id,
					startDate: moment(START_DATE),
					endDate: moment(END_DATE),
					highlight: HIGHLIGHTS
				});
			}
		},
		[ initValue, selectedMallId ]
	);

	const sdChange = (val) => {
		setSd(val);
	};
	const edChange = (val) => {
		setEd(val);
	};
	return (
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
					{...layout}
					form={form}
					onFinish={onFinish}
					autoComplete="off"
					initialValues={initialValues}
				>
					<Form.Item
						label="Start Date"
						name="startDate"
						rules={[
							{ required: true, message: 'Please enter start date' },
							() => ({
								validator(_, value) {
									if (moment(value).isAfter(moment(ed))) {
										return Promise.reject('start date must be less than end date');
									}
									return Promise.resolve();
								}
							})
						]}
					>
						<DatePicker format="YYYY-MM-DD" allowClear={false} onChange={sdChange} />
					</Form.Item>
					<Form.Item
						label="End Date"
						name="endDate"
						rules={[
							{ required: true, message: 'Please enter end date' },
							() => ({
								validator(_, value) {
									if (moment(value).isBefore(moment(sd))) {
										return Promise.reject('end date must be greater start date');
									}
									return Promise.resolve();
								}
							})
						]}
					>
						<DatePicker format="YYYY-MM-DD" allowClear={false} onChange={edChange} />
					</Form.Item>
					{type === 'Addnew' && (
						<Form.Item
							label="Mall"
							name="mallId"
							rules={[ { required: true, message: 'Please select the mall' } ]}
						>
							<Select
								placeholder="Select a Mall"
								optionFilterProp="children"
								onChange={onChange}
								filterOption={(input, option) =>
									option.children.toLowerCase().includes(input.toLowerCase())}
							>
								{allMallsData &&
									allMallsData.map((option) => (
										<Option key={option.ID} value={option.ID}>
											{option.MALL_NAMES}
										</Option>
									))}
							</Select>
						</Form.Item>
					)}
					{type === 'Addnew' && (
						<Form.Item
							label="Shop"
							name="shopId"
							rules={[ { required: true, message: 'Please select the shop' } ]}
						>
							<Select
								placeholder="Select a Shop"
								optionFilterProp="children"
								onChange={onChange2}
								filterOption={(input, option) =>
									option.children.toLowerCase().includes(input.toLowerCase())}
							>
								{shopDatas &&
									shopDatas.map((option) => (
										<Option key={option.ID} value={option.ID}>
											{option.SHOP_NAME}
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
	);
};

export default HighLightModal;
