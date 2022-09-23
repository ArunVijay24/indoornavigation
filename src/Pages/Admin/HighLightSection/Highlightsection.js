import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Components
import HighLightModal from './AddHighlight';
import HighlightTable from './HighlightTable';
import MallModal from './MallModal';

//Styles
import './style.scss';

//Redux
import { getAllMallsData } from '../../../Services/AllMallsData/action';
import { clearShopData, getShopId } from '../../../Services/HighlightByShopId/action';
import { getByMallData } from '../../../Services/HighlightsByMall/action';
import API_CALL from '../../../Services';

//Others
import { Button, Select, Space } from 'antd';
import _isEmpty from 'lodash/isEmpty';

const Highlightsection = () => {
	const { Option } = Select;
	const [addModal, setAddModal] = useState(false),
		[addMallModal, setAddMallModal] = useState(false),
		//[mallData, setMallData] = useState([]),
		[malls, setMalls] = useState([
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
		[selectedMallId, setSelectedMallId] = useState(),
		[selectedShopId, setSelectedShopId] = useState();
	const [shopDataSource, setShopDataSource] = useState([]);


	const dispatch = useDispatch();

	const { allMallsData, shopDatas } = useSelector(({ shopReducer, mallDataReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData,
			shopDatas: shopReducer.response.shopDatas,
		};
	});

	useEffect(() => {
		dispatch(getAllMallsData())
	}, []);

	useEffect(() => {
		return () => {
			dispatch(clearShopData())
		}
	},[])

	const onChange = (value) => {
		setSelectedMallId(value);
		dispatch(getByMallData(value));
		dispatch(getShopId(value));
	};

	const onChange2 = (value) => {
		setSelectedShopId(value);
	};
	
	useEffect(
		() => {
			if (selectedMallId && selectedShopId) {
				let payload = {
					mallId: selectedMallId,
					shopId: selectedShopId
				};
				API_CALL({
					method: 'post',
					url: `highlightById`,
					data: payload,
					callback: ({ data, status }) => {
						if (status === 200) {
							setShopDataSource(data.data)
						}
					}
				})
			}
		},
		[ selectedMallId, selectedShopId ]
	);
	return (
		<div className="content">
			<div className="site-layout-content">
				<h1 className="text-center">Welcome to Highlight</h1>
				<Space className="action-container">
					<Button onClick={() => setAddModal(true)}>Add Highlights</Button>
					<Button onClick={() => setAddMallModal(true)}>Add New Mall</Button>
					<Select
						allowClear
						style={{ width: 140}}
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
						allowClear
						style={{width: 140}}
						placeholder="Select a Shop"
						optionFilterProp="children"
						onChange={onChange2}
						filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					>
						{shopDatas &&
							shopDatas.map((option) => (
								<Option key={option.ID} value={option.ID}>
									{option.SHOP_NAME}
								</Option>
							))}
					</Select>
				</Space>
				<HighlightTable shopDataSource={shopDataSource} />
				<HighLightModal type="Addnew" openModal={addModal} closeModal={() => setAddModal(false)} />
				<MallModal openModal={addMallModal} closeModal={() => setAddMallModal(false)} />
			</div>
		</div>
	);
};

export default Highlightsection;
