import { Role } from './role';
export class User{

    id: number;
    firstname: string;
    surname: string;
    username: string;
    phone: string;
    email: string;
    roles: Role[];
    target: string;
    settings: string;
}