import { deleteData } from '../utils/api';

export const deleteStudent = async (studentId: number): Promise<void> => {
  const endpoint = `/students/${studentId}`;
  return await deleteData(endpoint);
};
