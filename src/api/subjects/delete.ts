import { deleteData } from '../utils/api';

export const deleteSubject = async (subjectId: number): Promise<void> => {
  const endpoint = `/subjects/${subjectId}`;
  return deleteData(endpoint);
};
