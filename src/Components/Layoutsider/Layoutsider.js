import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Select, Space } from 'antd';

const { Header, Sider } = Layout;
const { Option } = Select;
const Layoutsider = (props) => {
	const [ collapsed, setCollapsed ] = useState(false);
	const { items, roleChange } = props;
	const roles = [ 'admin', 'user' ];
	const onChange = (role) => {
		roleChange(role);
	};
	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Space>
				<Header className="site-layout-background">
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed)
					})}
				</Header>
				<Select
					showSearch
					placeholder="Select a Role"
					optionFilterProp="children"
					onChange={onChange}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
				>
					{roles.map((option) => (
						<Option key={option} value={option}>
							{option}
						</Option>
					))}
				</Select>
			</Space>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={[ '1' ]} items={items} />
		</Sider>
	);
};

export default Layoutsider;
