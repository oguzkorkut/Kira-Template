import { SubMenu } from './sub-menu';


export class Menu {
  id: number;
  name: string;
  summary: string;  
  shortName: string; 
  subMenu: SubMenu[]; 
}
