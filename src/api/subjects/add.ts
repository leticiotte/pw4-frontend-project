import { ISubject } from '@/models/subjects/Subject';
import { ISubjectWithoutId } from '@/models/subjects/SubjectWithoutId';
import { postData } from '../utils/api';

export const addSubject = async (
  subject: ISubjectWithoutId
): Promise<{ subject: ISubject }> => {
  const body = subject;
  const endpoint = `/subjects`;
  return await postData(endpoint, body);
};
