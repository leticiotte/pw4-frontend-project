import { ISubject } from '@/models/subjects/Subject';
import { ISubjectWithoutId } from '@/models/subjects/SubjectWithoutId';
import { updateData } from '../utils/api';

export const updateSubject = async (
  subjectId: number,
  subject: ISubjectWithoutId
): Promise<{ subject: ISubject }> => {
  const body = subject;
  const endpoint = `/subjects/${subjectId}`;
  return await updateData(endpoint, body);
};
