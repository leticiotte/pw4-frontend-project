import { deleteData } from '../utils/api';

export const deleteClass = async (classId: number): Promise<void> => {
  const endpoint = `/classes/${classId}`;
  return deleteData(endpoint);
};
