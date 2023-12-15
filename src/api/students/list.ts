import { IStudentWithDetails } from '@/models/students/StudentWithDetails';
import { fetchData } from '../utils/api';

export const listStudents = async (): Promise<{
  students: IStudentWithDetails[];
}> => {
  const endpoint = '/students';
  return await fetchData(endpoint);
};
