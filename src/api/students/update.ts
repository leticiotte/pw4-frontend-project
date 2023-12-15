import { IStudent } from '@/models/students/Student';
import { updateData } from '../utils/api';

export const updateStudent = async (
  studentId: number,
  student: IStudent
): Promise<{ student: IStudent }> => {
  const body = student;
  const endpoint = `/students/${studentId}`;
  return await updateData(endpoint, body);
};
