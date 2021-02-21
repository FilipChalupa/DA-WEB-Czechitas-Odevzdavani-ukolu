import { Link } from '@material-ui/core'
import { ColDef, DataGrid } from '@material-ui/data-grid'
import React from 'react'
import { useStudents } from '../utils/useStudents'

export const AdminDashboard: React.FunctionComponent = ({}) => {
	const students = useStudents()

	const columns = React.useMemo<ColDef[]>(
		() => [
			{ field: 'name', headerName: 'Jméno' },
			{
				field: 'githubUsername',
				headerName: 'GitHub',
				renderCell: (parameters) => (
					<Link
						color="secondary"
						href={`https://github.com/${parameters.value}`}
					>
						{parameters.value}
					</Link>
				),
			},
		],
		[],
	)

	const rows = React.useMemo(
		() =>
			students.map((item) => ({
				id: item.id,
				name: item.name,
				githubUsername: item.githubUsername,
			})),
		[students],
	)

	return (
		<DataGrid
			rows={rows}
			columns={columns}
			autoHeight
			hideFooter
			density="compact"
		/>
	)
}
