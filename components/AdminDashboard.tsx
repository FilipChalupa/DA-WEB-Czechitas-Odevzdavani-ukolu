import { Link } from '@material-ui/core'
import { CellParams, ColDef, DataGrid } from '@material-ui/data-grid'
import React from 'react'
import { useStudents } from '../utils/useStudents'

const segmentedTasks = Array(5)
	.fill(null)
	.map((_, i) => i + 1)

const createGapColumn = (id: string | number): ColDef => ({
	field: `gap-${id}`,
	headerName: ' ',
	width: 20,
	disableColumnMenu: true,
})

const formatDateIntl = new Intl.DateTimeFormat('cs', {
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
})
const renderDateCell = (parameters: CellParams) => (
	<>
		{parameters.value instanceof Date
			? formatDateIntl.format(parameters.value)
			: ''}
	</>
)

export const AdminDashboard: React.FunctionComponent = ({}) => {
	const students = useStudents()

	const findStudent = React.useCallback(
		(id: string) => students.find((student) => student.id === id),
		[students],
	)

	const renderStudentNameCell = React.useCallback(
		(parameters: CellParams) => {
			const student =
				typeof parameters.value === 'string' && findStudent(parameters.value)

			if (student) {
				return (
					<Link
						color="secondary"
						href={`https://github.com/${student.githubUsername}`}
					>
						{student.name}
					</Link>
				)
			}
			return <></>
		},
		[students, findStudent],
	)

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
			{
				field: 'piskvorkyRepository',
				headerName: 'Repozitář piškvorek',
				renderCell: (parameters) =>
					parameters.value ? (
						<Link
							color="secondary"
							href={`https://github.com/${parameters.value}/piskvorky`}
						>
							repozitář
						</Link>
					) : (
						<></>
					),
			},
			createGapColumn(0),
			// @ts-ignore: odněkud to bere ColDef | undefined a undefined je nepovolené
			...segmentedTasks.flatMap((i): ColDef[] => [
				{
					field: `task${i}CodeDone`,
					headerName: `${i}. připraveno na review`,
					renderCell: renderDateCell,
				},
				{
					field: `task${i}Reviewee`,
					headerName: `${i}. píše review pro`,
					renderCell: renderStudentNameCell,
				},
				{
					field: `task${i}ReviewDone`,
					headerName: `${i}. review dokončeno`,
					renderCell: renderDateCell,
				},
				{
					field: `task${i}ReviewResponseDone`,
					headerName: `${i}. odpověď dokončena`,
					renderCell: renderDateCell,
				},
				createGapColumn(i),
			]),
			// @ts-ignore: podobný problém výše
			{
				field: 'taskTeamRepositoryLink',
				headerName: '6. odkaz na repozitář',
			},
			// @ts-ignore: podobný problém výše
			{
				field: 'taskTeamCodeDone',
				headerName: '6. připraveno na review',
				renderCell: renderDateCell,
			},
			// @ts-ignore: podobný problém výše
			{
				field: 'taskTeamPartner',
				headerName: '6. partner',
			},
			// @ts-ignore: podobný problém výše
			{
				field: 'taskTeamReviewDoneBy',
				headerName: '6. review napsáno od',
			},
			,
		],
		[renderStudentNameCell],
	)

	const rows = React.useMemo(
		() =>
			students.map((item) => ({
				id: item.id,
				name: item.name,
				githubUsername: item.githubUsername,
				piskvorkyRepository: item.task1CodeDone && item.githubUsername,
				...Object.fromEntries(
					segmentedTasks.flatMap((i) => [
						[`task${i}CodeDone`, (item as any)[`task${i}CodeDone`]],
						[`task${i}Reviewee`, (item as any)[`task${i}Reviewee`]],
						[`task${i}ReviewDone`, (item as any)[`task${i}ReviewDone`]],
						[
							`task${i}ReviewResponseDone`,
							(item as any)[`task${i}ReviewResponseDone`],
						],
					]),
				),
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
