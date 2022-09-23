import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Styles
import imageurl from '../../assets/images/Mall.jpg';
import './style.scss';

//Redux
import { getAllMallsData } from '../../Services/AllMallsData/action';
import { getByMallData } from '../../Services/HighlightsByMall/action';

//Others
import { Media } from 'reactstrap';
import { Card, Select } from 'antd';
import Axios from 'axios';
import moment from 'moment/moment';

const { Option } = Select;

const Dashboard = ({ mallImg }) => {
	const dispatch = useDispatch();
	// const [ malls, setMalls ] = useState([
	// 		{
	// 			ID: 1,
	// 			MALL_NAMES: 'Phoenix-Mall',
	// 			LINKS:
	// 				'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/2a/98/15/phoenix-marketcity-mumbai.jpg?w=1200&h=-1&s=1'
	// 		},
	// 		{
	// 			ID: 2,
	// 			MALL_NAMES: 'Nexus-Mall',
	// 			LINKS:
	// 				'https://www.nexusmalls.com/resources/assets/coporate/images/forum-kormangala/forum-kormangala-img2.jpg'
	// 		},
	// 		{
	// 			ID: 3,
	// 			MALL_NAMES: 'Marina-Mall',
	// 			LINKS: 'https://www.olympiagroup.in/olympia-panache/img/map/Final/THE-MARINA-MALL.jpg'
	// 		}
	// 	]),
	const [ mallData, setMallData ] = useState([]),
		[ image, setImage ] = useState(imageurl),
		[mallName, setMallName] = useState('');

		const { allMallsData } = useSelector(({ mallDataReducer }) => {
			return {
				allMallsData: mallDataReducer.response.allMallsData
			};
		});
	

	useEffect(() => {
		dispatch(getAllMallsData())
	}, []);

	mallImg(image);
	const getbymallsurl = 'http://192.168.68.123:3000/FindMyWay/api/test/highlightsByMall';
	const onChange = (value) => {
		let img = allMallsData&& allMallsData.filter((mall) => mall.ID === value);

		setImage(img[0].LINKS);

		setMallName(img[0].MALL_NAMES);
		dispatch(getByMallData(value))
	};

	const validHighlights = mallData.filter(
		(data) =>
			moment(data.START_DATE).isBefore(moment()) ||
			(moment(data.START_DATE).isSame(moment()) && moment(data.END_DATE).isAfter(moment())) ||
			moment(data.END_DATE).isSame(moment())
	);

	return (
		<div className="content">
			<div className="mall">
				<h1 className="hlheader">{`Welcome to ${mallName ? mallName : 'Dashboard'} `}</h1>
				<Select
					placeholder="Select a Mall"
					optionFilterProp="children"
					onChange={onChange}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
				>
					{allMallsData && allMallsData.map((option) => (
						<Option key={option.ID} value={option.ID}>
							{option.MALL_NAMES}
						</Option>
					))}
				</Select>

				<Media className="text-center">
					<img
						src={image}
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							border: `3px solid #f4f5fa`
						}}
						alt="dashboard"
						className="shadow  p-3"
					/>
				</Media>
			</div>
			<div className="site-layout-content" />
			<div className="cardgroup">
				{validHighlights.map((mall) => (
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
