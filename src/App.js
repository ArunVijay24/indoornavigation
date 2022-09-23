import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//antd
import { UserOutlined, DoubleRightOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

//styles
import 'antd/dist/antd.min.css';
import './index.css';
import './assets/common_styles/antdOverrideStyles.scss';
import './styles.css';

//pages
import Dashboard from './Pages/Dashboard/Dashboard';
import FindMyWay from './Pages/FindMyWay/FindMyWay';
import Highlight from './Pages/Admin/HighLightSection/Highlightsection';
import Layoutsider from './Components/Layoutsider/Layoutsider';

const { Content } = Layout;

const App = () => {
	const [ role, setRole ] = useState(''),
		[ bgImage, setBgImage ] = useState('');
	console.log('BG', bgImage);
	const items = [
		{
			key: '1',
			icon: <UserOutlined />,
			label: 'Dashboard',
			onClick: () => navigate('/dashboard')
		},
		{
			key: '2',
			icon: <DoubleRightOutlined />,
			label: 'FindMyWay',
			onClick: () => navigate('/findmyway')
		}
	];
	const items2 = [
		{
			key: '1',
			icon: <UserAddOutlined />,
			label: 'HighLightSection',
			onClick: () => navigate('/highlightsection')
		}
	];
	console.log('role', role);
	const navigate = useNavigate();
	return role === 'admin' ? (
		<Layout className="layout">
			<Layoutsider items={items2} roleChange={(val) => setRole(val)} />
			<Layout
				className="site-layout"
				style={{
					backgroundImage: `url(${bgImage})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					height: '500px'
				}}
			>
				<Content className="">
					<Routes>
						<Route path="/highlightsection" element={<Highlight />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	) : (
		<Layout className="layout">
			<Layoutsider items={items} roleChange={(val) => setRole(val)} />
			<Layout className="site-layout contentimg">
				<Content className="">
					<Routes>
						<Route path="/dashboard" element={<Dashboard mallImg={(img) => setBgImage(img)} />} />
						<Route path="/findMyWay" element={<FindMyWay />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};

export default App;
