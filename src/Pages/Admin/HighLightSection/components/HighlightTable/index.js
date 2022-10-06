import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Components
import SkeletonStructure from '../../../../../Components/SkeletonStructure';
import HighLightModal from '../HighLightModal';

//Redux
import { getHighlightTableData } from '../../../../../Services/AdminHighlight/action';

//Others
import { Button, Table } from 'antd';
import moment from 'moment';

const HighlightTable = ({ shopDataSource, mallId, shopId }) => {
	const [ updateModal, setUpdateModal ] = useState(false);
	const [ modalData, setModalData ] = useState({});
	const dispatch = useDispatch();
	const dateFormat = 'YYYY-MM-DD';

	const {
		highlightTableData,
		tableDataLoader,
		mallDataSource,
		mallDataLoader
	} = useSelector(({ highlightReducer, highlightMallDataReducer }) => {
		return {
			highlightTableData: highlightReducer.response.highlightTableData,
			tableDataLoader: highlightReducer.requesting,
			mallDataSource: highlightMallDataReducer.response.mallData,
			mallDataLoader: highlightMallDataReducer.requesting
		};
	});

	useEffect(() => {
		dispatch(getHighlightTableData());
	}, []);

	const columns = [
		{
			title: 'Start Date',
			dataIndex: 'START_DATE',
			key: 'START_DATE',
			render: (value) => moment(value).format(dateFormat)
		},
		{
			title: 'End Date',
			dataIndex: 'END_DATE',
			key: 'END_DATE',
			render: (value) => moment(value).format(dateFormat)
		},
		{
			title: 'Highlight Message',
			dataIndex: 'HIGHLIGHTS',
			key: 'HIGHLIGHTS'
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, record) => {
				return (
					<Button
						type="primary"
						onClick={() => {
							setModalData(record);
							setUpdateModal(true);
						}}
					>
						Edit
					</Button>
				);
			}
		}
	];

	return tableDataLoader || mallDataLoader ? (
		<SkeletonStructure type={'table'} noOfColumn={4} />
	) : (
		<Fragment>
			<HighLightModal
				type="Update"
				openModal={updateModal}
				closeModal={() => setUpdateModal(false)}
				initValue={modalData}
			/>
			<Table
				dataSource={shopId !== 0 ? shopDataSource : mallId !== 0 ? mallDataSource : highlightTableData}
				columns={columns}
				className="highlight"
				rowKey="ID"
			/>
		</Fragment>
	);
};
export default HighlightTable;
