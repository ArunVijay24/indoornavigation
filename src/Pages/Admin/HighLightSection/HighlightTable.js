import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Components
import SkeletonStructure from '../../../Components/SkeletonStructure';
import HighLightModal from './AddHighlight';

//Redux
import { getHighlightTableData } from '../../../Services/AdminHighlight/action';

//Others
import { Button, Table } from 'antd';

const HighlightTable = () => {
	const [updateModal, setUpdateModal] = useState(false);
	const [modalData, setModalData] = useState({})
	const dispatch = useDispatch();

	const { highlightTableData, tableDataLoader } = useSelector(({ highlightReducer }) => {
		return {
			highlightTableData: highlightReducer.response.highlightTableData,
			tableDataLoader: highlightReducer.requesting
		}
	})

	const dataSource = [
		{
			Id: 1,
			START_DATE: '2008-11-11',
			END_DATE: '2008-11-24',
			HIGHLIGHTS: 'TESTING'
		},
		{
			Id: 2,
			START_DATE: '2005-11-11',
			END_DATE: '2005-11-24',
			HIGHLIGHTS: 'OFFER'
		}
	]

	useEffect(() => {
		dispatch(getHighlightTableData());
	},[])

	const columns = [
		{
			title: 'Start Date',
			dataIndex: 'START_DATE',
			key: 'START_DATE',
		},
		{
			title: 'End Date',
			dataIndex: 'END_DATE',
			key: 'END_DATE',
		},
		{
			title: 'Highlight Message',
			dataIndex: 'HIGHLIGHTS',
			key: 'HIGHLIGHTS',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, record) => { 
				return ( <Button
					type='primary'
					onClick={() => {
						setModalData(record);
				        setUpdateModal(true)
					}}
				>
					Edit
				</Button>
			);}
		}
	];

	return tableDataLoader ? <SkeletonStructure type={'table'} noOfColumn={4} /> :
		<Fragment>
		    <HighLightModal
				type="Update"
				openModal={updateModal}
				closeModal={() => setUpdateModal(false)}
				initValue={modalData}
				/>
		    <Table dataSource={highlightTableData} columns={columns} className="highlight" rowKey="Id" />
	    </Fragment>
};

export default HighlightTable;
