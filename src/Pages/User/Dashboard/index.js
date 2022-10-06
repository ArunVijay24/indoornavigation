import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Styles
import imageurl from '../../../assets/images/Mall.jpg';
import './style.scss';

//Redux
import { getAllMallsData } from '../../../Services/AllMallsData/action';
import { getByMallData, clearMallDataSource } from '../../../Services/HighlightsByMall/action';

//Others
import { Card, Select } from 'antd';
import moment from 'moment/moment';

const { Option } = Select;

const Dashboard = () => {
	const dispatch = useDispatch();

	const [ image, setImage ] = useState(imageurl);
	const [ mallName, setMallName ] = useState('');

	const { allMallsData, mallData } = useSelector(({ mallDataReducer, highlightMallDataReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData,
			mallData: highlightMallDataReducer.response.mallData
		};
	});

	const onChange = (value) => {
		let img = allMallsData && allMallsData.filter((mall) => mall.ID === value);
		if (value !== undefined) {
			setMallName(img[0].MALL_NAMES);
			setImage(img[0].LINKS);
			dispatch(getByMallData(value));
		} else {
			setMallName('');
			setImage(imageurl);
			dispatch(clearMallDataSource([]));
		}
	};

	const validHighlights =
		mallData &&
		mallData.filter(
			(data) =>
				moment(data.START_DATE).isBefore(moment()) ||
				(moment(data.START_DATE).isSame(moment()) && moment(data.END_DATE).isAfter(moment())) ||
				moment(data.END_DATE).isSame(moment())
		);

	useEffect(() => {
		dispatch(getAllMallsData());
	}, []);

	return (
		<div className="component-container">
			<h1 className="hlheader">{` ${mallName ? mallName : 'FindMyWay'} `}</h1>
			<div className="cardgroup">
				{mallData.map((mall) => (
					<div className="highlightcard">
						<Card key={mall.ID} extra={<a href="#">More</a>} style={{ width: 300, height: 200 }}>
							<h3>{mall.HIGHLIGHTS}</h3>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
