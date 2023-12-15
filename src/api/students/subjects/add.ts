import { postData } from '../../utils/api';

interface IBody {
  subjectId: number;
}

export const addStudentSubject = async (
  studentId: number,
  subjectId: number
): Promise<void> => {
  const body: IBody = { subjectId: subjectId };
  const endpoint = `/students/${studentId}/subjects`;
  await postData(endpoint, body);
};
