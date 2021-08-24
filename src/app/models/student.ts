import { Departman } from './departman';
import { Status } from './status';

export class Student {
    id: number;
    broj_indeksa: string;
    ime: string;
    prezime: string;
    departman: Departman;
    status: Status;
}