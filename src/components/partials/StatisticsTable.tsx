import { Container, Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReducerType } from '../../rootReducer';
import { Courses } from '../../slices/courses';
import { SERVER_URL } from '../../variables';

interface StatisticsTableProps {
	id: string;
}

interface StatisticsDataProps {
	averageMidtermScore: number;
	averageFinalScore: number;
	averageQuizScore: number;

	data: {
		id: number;
		midtermExamScore: number;
		finalExamScore: number;
		quizScore: number;

		user: {
			userId: number;
			name: string;
		}
	}[];
}

export default function StatisticsTable({ id }: StatisticsTableProps) {
	const [statistics, setStatistics] = useState<StatisticsDataProps>();
	const courses = useSelector<ReducerType, Courses[]>((state) => state.courses);
	const course = courses.find((course) => course.id === Number(id))
	const courseId = course?.courseId;

	useEffect(() => {
		axios
			.get(`${SERVER_URL}/courses/${courseId}/statistics`, { withCredentials: true })
			.then((res) => {
				console.log(res);
				if (statistics === undefined) setStatistics(res.data);
				setStatistics(res.data);
				console.log(statistics);
			})
			.catch(error => alert('학생 통계 정보를 가져오는데 실패했습니다.'));
	}, []);

	return (
		<Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
			<Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography>
					중간고사 평균 점수 : {statistics?.averageMidtermScore}
				</Typography>
				<Typography>
					기말고사 평균 점수 : {statistics?.averageFinalScore}
				</Typography>
				<Typography>
					퀴즈 평균 점수 : {statistics?.averageQuizScore}
				</Typography>
			</Container>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>이름</TableCell>
						<TableCell>학번</TableCell>
						<TableCell>중간고사 점수</TableCell>
						<TableCell>기말고사 점수</TableCell>
						<TableCell>퀴즈 점수</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{statistics?.data.map((value) => (
						<TableRow
							key={value.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell>{value.user.name}</TableCell>
							<TableCell>{value.user.userId}</TableCell>
							<TableCell>{value.midtermExamScore}</TableCell>
							<TableCell>{value.finalExamScore}</TableCell>
							<TableCell>{value.quizScore}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
}