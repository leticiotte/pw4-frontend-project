import { ISubject } from '@/models/subjects/Subject';
import { deleteData } from '../../utils/api';

export const deleteStudentSubject = async (
  studentId: number,
  subjectId: number
): Promise<{
  subjects: ISubject[];
}> => {
  const endpoint = `/students/${studentId}/subjects/${subjectId}`;
  return await deleteData(endpoint);
};
