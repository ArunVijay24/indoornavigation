import React, { Fragment } from 'react';
import { Skeleton, Table } from 'antd';

const SkeletonStructure = ({ type, noOfColumn, count, rows }) => {
	const SkeletonWithTitle = () => {
		return <Skeleton paragraph={false} active />;
	};

	const SkeletonWithTable = () => {
		const datas = [
			{
				key: '1'
			},
			{
				key: '2'
			},
			{
				key: '3'
			},
			{
				key: '4'
			},
			{
				key: '5'
			}
		];

		let columns = Array(noOfColumn).fill({});

		columns[0].title = <SkeletonWithTitle />;

		return (
			<Table
				columns={columns.map((column) => {
					return {
						...column,
						render: function skeleton() {
							return <SkeletonWithTitle />;
						}
					};
				})}
				dataSource={datas}
			/>
		);
	};

	if (type === 'title') {
		return <SkeletonWithTitle />;
	}
	if (type === 'table') {
		return <SkeletonWithTable />;
	}

	if (type === 'skeletonParagraph') {
		return [ ...Array(count) ].map((item, index) => (
			<Fragment>
				<Skeleton active title={false} paragraph={{ rows: rows, width: '100%' }} key={index} />
				<br />
			</Fragment>
		));
	}
};

export default SkeletonStructure;
