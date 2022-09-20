import { Button, Table, Space } from 'antd';

const HighlightTable = () => {
	const dataSource = [];
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
	return <Table dataSource={dataSource} columns={columns} className="highlight" />;
};

export default HighlightTable;
