import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Components
import HighLightModal from './AddHighlight';
import HighlightTable from './HighlightTable';
import MallModal from './MallModal';

//Redux
import { getAllMallsData } from '../../../Services/AdminHighlight/action';
import API_CALL from '../../../Services';

//Others
import { Button, Select, Space } from 'antd';
import Axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

const { Option } = Select;

const Highlightsection = () => {
	const [ addModal, setAddModal ] = useState(false),
		[ updateModal, setUpdateModal ] = useState(false),
		[ addMallModal, setAddMallModal ] = useState(false),
		[ modalValue, setModalValue ] = useState({}),
		[ mallData, setMallData ] = useState([]),
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
		[ selectedMallId, setSelectedMallId ] = useState(),
		[ selectedShopId, setSelectedShopId ] = useState(),
		[ shopsData, setShopsData ] = useState([]);

	const dispatch = useDispatch();

	const { allMallsData } = useSelector(({ highlightReducer }) => {
		return {
			allMallsData: highlightReducer.response.allMallsData
		};
	});

	useEffect(() => {
		API_CALL({
			method: 'get',
			url: `malls`,
			callback: ({ data, status }) => {
				if (status === 200) {
					dispatch(getAllMallsData(data.data));
				}
			}
		});
	}, []);

	const getbymallsurl = 'http://192.168.0.164:3000/FindMyWay/api/test/highlightsByMall';
	const onChange = (value) => {
		setSelectedMallId(value);
		Axios({
			method: 'get',
			url: getbymallsurl,
			params: { id: value }
		})
			.then(({ data, status }) => {
				setMallData(data.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
		Axios({
			method: 'get',
			url: url2 + `${value}`
		})
			.then(({ data, status }) => {
				console.log('data: ', data, status);
				setShopsData(data.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	const url2 = 'http://192.168.0.164:3000/FindMyWay/api/test/shopById/';

	const onChange2 = (value) => {
		setSelectedShopId(value);
	};
	console.log('sv', selectedMallId, selectedShopId);

	const url3 = 'http://192.168.0.164:3000/FindMyWay/api/test/highlightById';
	const makeAPICall = async (values) => {
		await Axios({
			method: 'post',
			url: url3,
			data: values
		})
			.then(({ data, status }) => {
				console.log('data3: ', data, status);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};
	useEffect(
		() => {
			if (selectedMallId && selectedShopId) {
				let payload = {
					mallId: selectedMallId,
					shopId: selectedShopId
				};
				makeAPICall(payload);
			}
		},
		[ selectedMallId, selectedShopId ]
	);
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1 className="text-center">Welcome to Highlight</h1>
				<Space>
					<Button onClick={() => setAddModal(true)}>Add Highlights</Button>
					<Button onClick={() => setAddMallModal(true)}>Add New Mall</Button>
					<Select
						showSearch
						placeholder="Select a Mall"
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
					<Select
						showSearch
						placeholder="Select a Shop"
						optionFilterProp="children"
						onChange={onChange2}
						filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					>
						{shopsData &&
							shopsData.map((option) => (
								<Option key={option.ID} value={option.ID}>
									{option.SHOP_NAME}
								</Option>
							))}
					</Select>
				</Space>
				<HighlightTable
					modal={(val) => setUpdateModal(val)}
					initVal={(val) => setModalValue(val)}
					data={mallData}
				/>
				<HighLightModal type="Addnew" openModal={addModal} closeModal={() => setAddModal(false)} />
				{!_isEmpty(modalValue) && (
					<HighLightModal
						type="Update"
						openModal={updateModal}
						closeModal={() => setUpdateModal(false)}
						initValue={modalValue}
					/>
				)}
				<MallModal openModal={addMallModal} closeModal={() => setAddMallModal(false)} />
			</div>
		</div>
	);
};

export default Highlightsection;
