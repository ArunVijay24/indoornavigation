import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//Components
import API_CALL from '../../../Services';

//Styles
import './style.scss';

//Others
import { Button, Form, Select, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Canvas from '../Canvas/Canvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLeftLong, faRightLong, faUpLong } from '@fortawesome/free-solid-svg-icons';

const FindMyWay = () => {
	const [ from, setFrom ] = useState('');
	const [ to, setTo ] = useState('');
	const [ fromTo, setFromTo ] = useState({}),
		[ srcOptions, setSrcOptions ] = useState([]),
		[ dtnOptions, setDtnOptions ] = useState([]),
		[ path, setPath ] = useState([]),
		[ buildId, setBuildId ] = useState('');

	const { Option } = Select;

	const { allMallsData } = useSelector(({ mallDataReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData
		};
	});

	const onChange = (value) => {
		setFrom(value);
	};
	const onChange2 = (value) => {
		setTo(value);
	};

	const onChange3 = (value) => {
		setBuildId(value);
		if (value !== undefined) {
			API_CALL({
				method: 'get',
				url: `fetchSource`,
				params: { id: value },
				callback: ({ data, status }) => {
					if (status === 200) {
						setSrcOptions(data.data);
					}
				}
			});
			API_CALL({
				method: 'get',
				url: `fetchDestination`,
				params: { id: value },
				callback: ({ data, status }) => {
					if (status === 200) {
						console.log('data', data);
						setDtnOptions(data.data);
					}
				}
			});
		}
	};

	// Unique
	const srcunique = [];
	const srcaddOption = (eventStatus) => {
		var index = srcunique.findIndex((status) => status.SOURCE_NODE == eventStatus.SOURCE_NODE);
		if (index === -1) {
			srcunique.push(eventStatus);
		} else {
			return null;
		}
	};

	srcOptions.map((map) => srcaddOption(map));

	const dtnunique = [];
	const dtnaddOption = (eventStatus) => {
		var index = dtnunique.findIndex((status) => status.DESTINATION_NODE == eventStatus.DESTINATION_NODE);
		if (index === -1) {
			dtnunique.push(eventStatus);
		} else {
			return null;
		}
	};

	dtnOptions.map((map) => dtnaddOption(map));

	const onFinish = (values) => {
		let { source, destination } = values;
		API_CALL({
			method: 'post',
			url: `findPath`,
			data: { source, destination, mallId: buildId },
			callback: ({ data, status }) => {
				if (status === 200) {
					setPath(data.data);
				}
			}
		});
		setFromTo(values);
	};

	const left = 'left',
		adjacentLeft = 'adjacent left',
		right = 'right',
		adjacentRight = 'adjacent right',
		straight = 'straight',
		opposite = 'opposite';

	const dir = path.map(
		(data) =>
			data.toLocaleLowerCase().includes(left) ? (
				<Space className="fmwmap">
					<FontAwesomeIcon icon={faLeftLong} />
					{data}
				</Space>
			) : data.toLocaleLowerCase().includes(adjacentLeft) ? (
				<Space className="fmwmap">
					<FontAwesomeIcon icon={faArrowLeft} />
					{data}
				</Space>
			) : data.toLocaleLowerCase().includes(adjacentRight) ? (
				<Space className="fmwmap">
					<FontAwesomeIcon icon={faRightLong} />
					{data}
				</Space>
			) : data.toLocaleLowerCase().includes(right) ? (
				<Space className="fmwmap">
					<FontAwesomeIcon icon={faRightLong} />
					{data}
				</Space>
			) : data.toLocaleLowerCase().includes(straight) ? (
				<Space className="fmwmap">
					<FontAwesomeIcon icon={faUpLong} />
					{data}
				</Space>
			) : data.toLocaleLowerCase().includes(opposite) ? (
				<Space className="fmwmap">
					<FontAwesomeIcon icon={faUpLong} />
					{data}
				</Space>
			) : (
				<Space className="fmwmap">{data}</Space>
			)
	);

	return (
		<div className="component-container">
			<h1 className="hlheader">Welcome to FindMyWay</h1>
			<Form.Item>
				<Select
					showSearch
					allowClear
					placeholder="Select a Mall"
					optionFilterProp="children"
					onChange={onChange3}
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
			<Form
				initialValues={{
					remember: true
				}}
				onFinish={onFinish}
				autoComplete="off"
				className="fmwform"
			>
				<Form.Item
					label="Starting Place"
					name="source"
					rules={[
						{ required: true, message: 'Please enter starting place' },
						() => ({
							validator(_, value) {
								if (value === to) {
									return Promise.reject('From and To are same,Please enter different source');
								}
								return Promise.resolve();
							}
						})
					]}
				>
					<Select
						showSearch
						placeholder="Select a Starting Place"
						optionFilterProp="children"
						onChange={onChange}
						filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					>
						{srcunique.map((option) => (
							<Option key={option.SOURCE_NODE} value={option.SOURCE_NODE}>
								{option.SOURCE_NODE}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Ending Place"
					name="destination"
					rules={[
						{ required: true, message: 'Please enter ending place' },
						() => ({
							validator(_, value) {
								if (value === from) {
									return Promise.reject('From and To are same,Please enter different destination');
								}
								return Promise.resolve();
							}
						})
					]}
				>
					<Select
						showSearch
						placeholder="Select a Destination"
						optionFilterProp="children"
						onChange={onChange2}
						filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					>
						{dtnunique.map((option) => (
							<Option key={option.DESTINATION_NODE} value={option.DESTINATION_NODE}>
								{option.DESTINATION_NODE}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Find Path
					</Button>
				</Form.Item>
			</Form>
			<div className="site-layout-content pathulslc">
				<ul className="pathul">{dir}</ul>
			</div>
			<Canvas>Your browser does not support the canvas element.</Canvas>
		</div>
	);
};

export default FindMyWay;
