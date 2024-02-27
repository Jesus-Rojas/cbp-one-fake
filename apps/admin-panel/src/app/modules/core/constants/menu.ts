import { MenuItem, MenuType } from '../types/menu-item';

export const menu: MenuItem[] = [
  {
    key: 'appointments',
    icon: 'handshake',
    label: 'Appointments',
    path: 'appointments',
    type: MenuType.Child,
  },
  {
    key: 'users',
    icon: 'manage_accounts',
    label: 'Users',
    path: 'users',
    type: MenuType.Child,
  },
];
