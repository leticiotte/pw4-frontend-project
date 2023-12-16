import { IClass } from '@/models/classes/Class';
import { IClassWithouId } from '@/models/classes/ClassWithouId';
import { postData } from '../utils/api';

export const addClass = async (
  classToAdd: IClassWithouId
): Promise<{ class: IClass }> => {
  const body = classToAdd;
  const endpoint = `/classes`;
  return await postData(endpoint, body);
};
