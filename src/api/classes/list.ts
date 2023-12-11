import { IClass } from '@/models/classes/Class';
import { fetchData } from '../utils/api';

export const listClasses = async (): Promise<{ classes: IClass[] }> => {
  const endpoint = '/classes';
  return fetchData(endpoint);
};
