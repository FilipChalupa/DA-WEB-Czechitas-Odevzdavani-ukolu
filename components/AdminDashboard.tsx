import { Link, MenuItem, Select } from '@material-ui/core'
import { CellParams, ColDef, DataGrid } from '@material-ui/data-grid'
import React from 'react'
import { update } from 'typesaurus'
import { useCourse } from '../contexts/CourseContext'
import { studentsCollection } from '../utils/db'
import { useStudents } from '../utils/useStudents'

type TaskId = 1 | 2 | 3 | 4 | 5

const segmentedTasks = Array(5)
	.fill(null)
	.map((_, i) => (i + 1) as TaskId)

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
	const courseId = useCourse().id

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

	const renderRevieweeSelect = React.useCallback(
		(taskId: TaskId, reviewerId: string, revieweeId: string | undefined) => (
			<Select
				value={revieweeId || ''}
				onChange={(event) => {
					const { value } = event.target
					if (typeof value === 'string') {
						update(studentsCollection(courseId), reviewerId, {
							[`task${taskId}Reviewee` as any]: value || undefined,
						})
					}
				}}
				style={{
					minWidth: '80px',
				}}
			>
				<MenuItem value="">
					<i>Nikdo</i>
				</MenuItem>
				{students
					.filter(
						(student) =>
							student.id !== reviewerId &&
							students.find(
								(x) =>
									(x as any)[`task${taskId}Reviewee`] === student.id &&
									student.id !== revieweeId,
							) === undefined,
					)
					.map((student) => (
						<MenuItem key={student.id} value={student.id}>
							{student.name}
						</MenuItem>
					))}
			</Select>
		),
		[students, courseId],
	)

	const renderRevieweeCell = React.useCallback(
		(taskId: TaskId) => (parameters: CellParams) => {
			return renderRevieweeSelect(
				taskId,
				parameters.row.id as string,
				parameters.value as string | undefined,
			)
		},
		[renderRevieweeSelect],
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
					renderCell: renderRevieweeCell(i),
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
