import { IStudent } from '@/models/students/Student';
import { fetchData } from '../utils/api';

export const listStudents = async (): Promise<{ students: IStudent[] }> => {
    const endpoint = '/students';
    return fetchData(endpoint);
};
