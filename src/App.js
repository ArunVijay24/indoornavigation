import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

//Components
import Dashboard from './Pages/User/Dashboard';
import FindMyWay from './Pages/User/FindMyWay';
import Admin from './Pages/Admin/HighLightSection';
import FindWayEntry from './Pages/Admin/FindWayEntry';
import Header from './Components/Header';

//Styles
import 'antd/dist/antd.min.css';
import './index.css';
import './assets/common_styles/antdOverrideStyles.scss';
import './styles.scss';
import './assets/common_styles/appStyle.scss';

//Others
import { Layout } from 'antd';

const App = () => {
	const { Content } = Layout;

	return (
		<Layout className="layout-container">
			<Header />
			<Content className="component-container">
				<Routes>
					<Route path="/highlightsection" element={<Admin />} />
					<Route path="/navigationentry" element={<FindWayEntry />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/findMyWay" element={<FindMyWay />} />
					<Route path="/" element={<Navigate to="/dashboard" />} />
				</Routes>
			</Content>
		</Layout>
	);
};

export default App;
