import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, version } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';
const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
	const [ collapsed, setCollapsed ] = useState(false);
	const items = [
		{
			key: '1',
			icon: <UserOutlined />,
			label: 'Dashboard'
		},
		{
			key: '2',
			icon: <VideoCameraOutlined />,
			label: 'FindMyWay'
		}
	];
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
			<Layout className="site-layout">
				<Content
					style={{
						padding: '0 50px'
					}}
				>
					<div className="site-layout-content">Welcome to FindMyWay</div>
					<span className="f_600">
						<FontAwesomeIcon icon={'twitter'} />
					</span>
				</Content>
				<Footer
					style={{
						textAlign: 'center'
					}}
				>
					FindMyWay ©2022 Created by Technerds {version}
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Dashboard;
