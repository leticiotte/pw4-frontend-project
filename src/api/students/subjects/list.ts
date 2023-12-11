import { ISubject } from "@/models/subjects/Subject";
import { fetchData } from "../../utils/api";

export const listStudentSubjects = async (
  studentId: number
): Promise<{
  subjects: ISubject[];
}> => {
  const endpoint = `/students/${studentId}/subjects`;
  return fetchData(endpoint);
};
