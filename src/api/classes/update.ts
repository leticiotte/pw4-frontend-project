import { IClass } from '@/models/classes/Class';
import { IClassWithouId } from '@/models/classes/ClassWithouId';
import { updateData } from '../utils/api';

export const updateClass = async (
  classId: number,
  classToUpdate: IClassWithouId
): Promise<{ class: IClass }> => {
  const body = classToUpdate;
  const endpoint = `/classes/${classId}`;
  return await updateData(endpoint, body);
};
