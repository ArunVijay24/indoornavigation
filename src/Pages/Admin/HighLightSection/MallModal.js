import { Button, Form, Input, Space, Modal } from 'antd';
import React from 'react';

import Axios from 'axios';

const MallModal = ({ openModal, closeModal }) => {
	const url = 'http://192.168.68.123:3000/FindMyWay/api/test/addMall';

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

	return (
		<React.Fragment>
			<Modal
				title={'Add New Mall'}
				centered
				open={openModal}
				onOk={closeModal}
				onCancel={closeModal}
				footer={null}
				destroyOnClose={true}
				maskClosable={false}
			>
				<Space>
					<Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
						<Form.Item
							label="Mall Name"
							name="mallName"
							rules={[ { required: true, message: 'Please enter the mall name' } ]}
						>
							<Input type="text" />
						</Form.Item>
						<Form.Item>
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

export default MallModal;
