import React from 'react';
import { useDispatch } from 'react-redux';

//Components
import API_CALL from '../../../../../Services';

//Redux
import { getAllMallsData } from '../../../../../Services/AllMallsData/action';

//Others
import { Button, Form, Input, Space, Modal, notification } from 'antd';

const MallModal = ({ openModal, closeModal }) => {
	const dispatch = useDispatch();

	let viviraMall =
		'https://www.google.com/url?sa=i&url=https%3A%2F%2Fchennai.mallsmarket.com%2Fmalls%2Fvivira-mall-omr-chennai&psig=AOvVaw1lfvpRV762UFvIOJLKUkBJ&ust=1664013027584000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIi4l97RqvoCFQAAAAAdAAAAABAQ';

	const onFinish = (values) => {
		let payloadValue = { ...values, link: viviraMall };
		closeModal();
		API_CALL({
			method: 'post',
			url: `addMall`,
			data: payloadValue,
			callback: ({ data, status }) => {
				if (status === 200) {
					notification.success({
						message: data.data,
						placement: 'top'
					});
					dispatch(getAllMallsData());
				}
			}
		});
	};

	return (
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
				<Form onFinish={onFinish} autoComplete="off">
					<Form.Item
						label="Building Name"
						name="mallName"
						rules={[ { required: true, message: 'Please enter the mall name' } ]}
					>
						<Input type="text" />
					</Form.Item>
					<Form.Item>
						<Space style={{ textAlign: 'center' }}>
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

export default MallModal;
