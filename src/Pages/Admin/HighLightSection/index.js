import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Components
import HighLightModal from './components/HighLightModal';
import HighlightTable from './components/HighlightTable';
import MallModal from './components/MallModal';
import API_CALL from '../../../Services';

//Styles
import './style.scss';

//Redux
import { getAllMallsData } from '../../../Services/AllMallsData/action';
import { clearShopData, getShopId } from '../../../Services/HighlightByShopId/action';
import { getByMallData, clearMallDataSource } from '../../../Services/HighlightsByMall/action';

//Others
import { Button, Select } from 'antd';

const HighlightSection = () => {
	const { Option } = Select;
	const dispatch = useDispatch();
	const [ addModal, setAddModal ] = useState(false);
	const [ addMallModal, setAddMallModal ] = useState(false);
	const [ selectedMallId, setSelectedMallId ] = useState(0);
	const [ selectedShopId, setSelectedShopId ] = useState(0);
	const [ shopDataSource, setShopDataSource ] = useState([]);

	const { allMallsData, shopDatas } = useSelector(({ shopReducer, mallDataReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData,
			shopDatas: shopReducer.response.shopDatas
		};
	});

	useEffect(() => {
		dispatch(getAllMallsData());
	}, []);

	useEffect(() => {
		return () => {
			dispatch(clearShopData([]));
		};
	}, []);

	useEffect(
		() => {
			return () => {
				if (selectedMallId === 0) {
					dispatch(clearShopData([]));
				}
			};
		},
		[ selectedMallId ]
	);

	useEffect(
		() => {
			if (selectedMallId === 0) {
				setSelectedShopId(0);
			}
		},
		[ selectedMallId ]
	);

	const onChange = (value) => {
		setSelectedMallId(value === undefined ? 0 : value);
		if (value !== undefined) {
			dispatch(getByMallData(value));
			dispatch(getShopId(value));
		} else {
			dispatch(clearMallDataSource([]));
		}
	};

	const onChange2 = (value) => {
		setSelectedShopId(value === undefined ? 0 : value);
		let payload = {
			mallId: selectedMallId ? selectedMallId : 0,
			shopId: selectedShopId ? selectedShopId : 0
		};
		if (value !== undefined) {
			API_CALL({
				method: 'post',
				url: `highlightById`,
				data: payload,
				callback: ({ data, status }) => {
					if (status === 200) {
						setShopDataSource(data.data);
					}
				}
			});
		} else {
			setShopDataSource([]);
		}
	};

	return (
		<div className="component-container">
			<div className="select-container">
				<Select
					allowClear
					showSearch
					style={{ width: 140 }}
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
				{selectedMallId !== 0 && (
					<Select
						allowClear
						showSearch
						style={{ width: 140 }}
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
				)}
			</div>
			<div className="action-container">
				<Button type="primary" onClick={() => setAddModal(true)}>
					Add Highlights
				</Button>
				<Button type="primary" onClick={() => setAddMallModal(true)}>
					Add New Building
				</Button>
			</div>
			<HighlightTable shopDataSource={shopDataSource} mallId={selectedMallId} shopId={selectedShopId} />
			<HighLightModal type="Addnew" openModal={addModal} closeModal={() => setAddModal(false)} />
			<MallModal openModal={addMallModal} closeModal={() => setAddMallModal(false)} />
		</div>
	);
};

export default HighlightSection;
