import { Role } from './role';
export class User{

    id: number;
    image:string;
    tckn: string;
    vkn: string;
    customerNumber: string;
    firstname: string;
    surname: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    title:string;
    roles: Role[];
    target: string;
    active:boolean;
    settings: string;
}