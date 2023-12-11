import { ISubject } from "@/models/subjects/Subject";
import { fetchData } from "../utils/api";

export const listSubjects = async (): Promise<{
  subjects: ISubject[];
}> => {
  const endpoint = `/subjects`;
  return fetchData(endpoint);
};
