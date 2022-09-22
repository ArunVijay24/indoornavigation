import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Components
import SkeletonStructure from '../../../Components/SkeletonStructure';

//Redux
import { getHighlightTableData } from '../../../Services/AdminHighlight/action';

//Others
import { Button, Table } from 'antd';

const HighlightTable = ({ modal, initVal, mallData }) => {
	const dispatch = useDispatch();

	const { highlightTableData, tableDataLoader } = useSelector(({ highlightReducer }) => {
		return {
			highlightTableData: highlightReducer.response.highlightTableData,
			tableDataLoader: highlightReducer.requesting
		}
	})

	const [ dataSource, setDataSource ] = useState([
		{
			ID: 1,
			START_DATE: '2008-11-11T00:00:00.000Z',
			END_DATE: '2008-11-11T00:00:00.000Z',
			HIGHLIGHTS: 'TESTING'
		}
	]);

	useEffect(() => {
		dispatch(getHighlightTableData());
	},[])

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

	return tableDataLoader ? <SkeletonStructure type={'table'} noOfColumn={4} /> : <Table dataSource={highlightTableData ? highlightTableData : dataSource} columns={columns} className="highlight" rowKey="Id" />;
};

export default HighlightTable;
