import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//antd
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, version } from 'antd';

//styles
import 'antd/dist/antd.min.css';
import './index.css';
import './assets/common_styles/antdOverrideStyles.css';
import './styles.css';

//pages
import Dashboard from './Pages/Dashboard/Dashboard';
import FindMyWay from './Pages/FindMyWay';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
	const [ collapsed, setCollapsed ] = useState(false);

	const items = [
		{
			key: '1',
			icon: <UserOutlined />,
			label: 'Dashboard',
			onClick: () => navigate('/dashboard')
		},
		{
			key: '2',
			icon: <VideoCameraOutlined />,
			label: 'FindMyWay',
			onClick: () => navigate('/findmyway')
		}
	];

	const navigate = useNavigate();
	return (
		<Layout className="layout">
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo" />
				<Header className="site-layout-background">
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed)
					})}
				</Header>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={[ '1' ]} items={items} />
			</Sider>
			<Layout className="site-layout contentimg">
				<Content className="">
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/findMyWay" element={<FindMyWay />} />
					</Routes>
				</Content>
				<Footer className="footer">FindMyWay ©2022 Created by Technerds {version}</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
