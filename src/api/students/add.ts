import { IStudent } from '@/models/students/Student';
import { IStudentWithoutId } from '@/models/students/StudentWithoutId';
import { postData } from '../utils/api';

export const addStudent = async (
  student: IStudentWithoutId
): Promise<{ student: IStudent }> => {
  const body = student;
  const endpoint = `/students`;
  return await postData(endpoint, body);
};
