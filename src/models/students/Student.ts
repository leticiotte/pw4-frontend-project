import { IClass } from "../classes/Class";
import { ISubject } from "../subjects/Subject";

export interface IStudent {
    id: number;
    name: string;
    studentNumber: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    classId: number;
    class: IClass;
    image?: string;
    subjects?: ISubject[]
}
