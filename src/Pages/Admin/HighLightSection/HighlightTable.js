import { Button, Table, Space } from 'antd';

import Axios from 'axios';
import { useEffect, useState } from 'react';

const HighlightTable = () => {
	const [ dataSource, setDataSource ] = useState([]);
	const columns = [
		{
			title: 'Start Date',
			dataIndex: 'startdate',
			key: 'startdate'
		},
		{
			title: 'End Date',
			dataIndex: 'enddate',
			key: 'enddate'
		},
		{
			title: 'Highlight Message',
			dataIndex: 'highlight',
			key: 'highlight'
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button>Edit</Button>
				</Space>
			)
		}
	];

	useEffect(() => {
		Axios({
			method: 'get',
			url: 'https://e7c0-183-82-30-144.in.ngrok.io/FindMyWay/api/test/highlights'
		})
			.then(({ data, status }) => {
				console.log('data: ', data, status);
				if (status === 200) {
					setDataSource(data);
				}
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	}, []);
	return <Table dataSource={dataSource} columns={columns} className="highlight" />;
};

export default HighlightTable;
