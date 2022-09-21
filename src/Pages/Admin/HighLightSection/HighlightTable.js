import { Button, Table } from 'antd';

import Axios from 'axios';
import { useEffect, useState } from 'react';

const HighlightTable = ({ modal, initVal }) => {
	const [ dataSource, setDataSource ] = useState([]);

	const url = 'http://192.168.0.164:3000/FindMyWay/api/test/highlights';

	const renderTableCell = (cell, row) => {
		const { START_DATE, END_DATE, HIGHLIGHTS } = row;

		switch (cell) {
			case START_DATE:
				return <div className="text-capitalize pl-3">{START_DATE}</div>;
			case END_DATE:
				return <div className="text-capitalize pl-3">{END_DATE}</div>;
			case HIGHLIGHTS:
				return <div className="pl-3">{HIGHLIGHTS ? HIGHLIGHTS : '--'}</div>;
			default:
				return (
					<Button
						className="px-4 edit"
						onClick={() => {
							initVal(row);
							modal(true);
						}}
					>
						Edit
					</Button>
				);
		}
	};

	const columns = [
		{
			title: 'Start Date',
			dataIndex: 'START_DATE',
			key: 'START_DATE',
			render: renderTableCell
		},
		{
			title: 'End Date',
			dataIndex: 'END_DATE',
			key: 'END_DATE',
			render: renderTableCell
		},
		{
			title: 'Highlight Message',
			dataIndex: 'HIGHLIGHTS',
			key: 'HIGHLIGHTS',
			render: renderTableCell
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: renderTableCell
		}
	];

	const makeAPICall = async () => {
		Axios({
			method: 'get',
			url: url,
			headers: { 'Access-Control-Allow-Origin': '*' }
		})
			.then(({ data, status }) => {
				if (status === 200) {
					setDataSource(data.data);
				}
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};
	useEffect(() => {
		makeAPICall();
	}, []);

	return <Table dataSource={dataSource} columns={columns} className="highlight" rowKey="Id" />;
};

export default HighlightTable;
