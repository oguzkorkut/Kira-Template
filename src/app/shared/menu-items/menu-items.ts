import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'sub',
        icon: 'ti-home',
        children: [
          {
            state: 'default',
            name: 'Default'
          }
        ]
      }
    ],
  },
  {
    label: 'App',
    main: [
      {
        state: 'rental-operations',
        short_label: 'R',
        name: 'Kira İşlemleri',
        type: 'sub',
        icon: 'ti-layout-media-right',
        children: [
          {
            state: 'new-rental-contrat',
            name: 'Yeni Kira Kontratı'
          },
          {
            state: 'search-rental-contrat',
            name: 'Kira Kontratı Ara'
          }
        ]
      },
      {
        state: 'customer-operations',
        short_label: 'C',
        name: 'Müşteri İşlemleri',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'customer-list',
            name: 'Müşteri Listeleme'
          },
          {
            state: 'customer-create',
            name: 'Yeni Müşteri'
          }
        ]
      },
      {
        state: 'tenant-operations',
        short_label: 'T',
        name: 'Kiracı İşlemleri',
        type: 'sub',
        icon: 'ti-direction-alt',
        children: [
          {
            state: 'payment-order',
            name: 'Ödeme Talimatları'
          },
          {
            state: 'rental-credit-application',
            name: 'Kira Başvuru İşlemleri'
          }
        ]
      }
    ],
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
