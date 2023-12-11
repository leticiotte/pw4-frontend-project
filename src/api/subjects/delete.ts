import { ISubject } from "@/models/subjects/Subject";
import { deleteData } from "../utils/api";

export const deleteSubject = async (
  subjectId: number
): Promise<{
  subjects: ISubject[];
}> => {
  const endpoint = `/subjects/${subjectId}`;
  return deleteData(endpoint);
};
