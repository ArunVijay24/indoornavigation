import React, { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Styles
import './style.scss';
import imageurl from '../../assets/images/Mall.jpg';

//Redux
import { getByMallData, clearMallDataSource } from '../../Services/HighlightsByMall/action';

//Others
import { Row, Col, Layout, Select, Typography } from 'antd';

const Header = () => {
	const dispatch = useDispatch();

	const { Header } = Layout;
	const { Text } = Typography;
	const { Option } = Select;
	const navigate = useNavigate();
	const roles = [ 'admin', 'user' ];

	const [ role, setRole ] = useState('user');
	const [ image, setImage ] = useState(imageurl);
	const [ mallName, setMallName ] = useState('');

	const { allMallsData } = useSelector(({ mallDataReducer }) => {
		return {
			allMallsData: mallDataReducer.response.allMallsData
		};
	});

	const handleRoleChange = (role) => {
		setRole(role);
		if (role === 'admin') {
			navigate('/highlightsection');
		}
		if (role == 'user') {
			navigate('/dashboard');
		}
	};

	const handleMallData = (value) => {
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

	//console.log('location', location.pathname);

	return (
		<Header className="header-container">
			<Col>
				<Row className="welcome-row">
					<Col>
						<Text strong>Welcome to Dashboard</Text>
					</Col>
					<Col>
						<Select
							style={{ width: 120 }}
							showSearch
							placeholder="Select a Role"
							optionFilterProp="children"
							defaultValue="user"
							onChange={handleRoleChange}
							filterOption={(input, option) =>
								option.children.toLowerCase().includes(input.toLowerCase())}
						>
							{roles.map((option) => (
								<Option key={option} value={option}>
									{option}
								</Option>
							))}
						</Select>
					</Col>
				</Row>
				<Row className="second-row">
					{role === 'user' ? (
						<Fragment>
							<Col>
								<NavLink
									className={({ isActive }) => (isActive ? 'active' : undefined)}
									to="/dashboard"
								>
									Dashboard
								</NavLink>
							</Col>
							<Col>
								<NavLink
									className={({ isActive }) => (isActive ? 'active' : undefined)}
									to="/findMyWay"
								>
									FindMyWay
								</NavLink>
							</Col>

							<div className="select-mall">
								<Select
									style={{ width: 120 }}
									showSearch
									allowClear
									placeholder="Select a Mall"
									optionFilterProp="children"
									onChange={handleMallData}
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
							</div>
						</Fragment>
					) : (
						<Fragment>
							<Col>
								<NavLink
									className={({ isActive }) => (isActive ? 'active' : undefined)}
									to="/highlightsection"
								>
									HighlightSection
								</NavLink>
							</Col>
							<Col>
								<NavLink
									className={({ isActive }) => (isActive ? 'active' : undefined)}
									to="/navigationentry"
								>
									NagivationEntry
								</NavLink>
							</Col>
						</Fragment>
					)}
				</Row>
			</Col>
		</Header>
	);
};

export default Header;
