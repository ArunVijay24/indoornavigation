import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider } = Layout;
const Layoutsider = (props) => {
	const [ collapsed, setCollapsed ] = useState(false);
	const { items } = props;
	return (
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
	);
};

export default Layoutsider;
