import { ISubject } from '@/models/subjects/Subject';
import { deleteData } from '../utils/api';

export const deleteStudent = async (
  studentId: number
): Promise<{
  subjects: ISubject[];
}> => {
  const endpoint = `/students/${studentId}`;
  return await deleteData(endpoint);
};
