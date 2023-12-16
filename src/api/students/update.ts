import { IStudent } from '@/models/students/Student';
import { IStudentWithoutId } from '@/models/students/StudentWithoutId';
import { updateData } from '../utils/api';

export const updateStudent = async (
  studentId: number,
  student: IStudentWithoutId
): Promise<{ student: IStudent }> => {
  const body = student;
  const endpoint = `/students/${studentId}`;
  return await updateData(endpoint, body);
};
