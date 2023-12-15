import { IStudent } from '@/models/students/Student';
import { postData } from '../utils/api';

export const addStudent = async (
  student: IStudent
): Promise<{ student: IStudent }> => {
  const body = student;
  const endpoint = `/students`;
  return await postData(endpoint, body);
};
