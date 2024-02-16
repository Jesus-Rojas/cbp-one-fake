import { MenuItem, MenuType } from '../types/menu-item';

export const menu: MenuItem[] = [
  {
    key: 'users',
    icon: 'manage_accounts',
    label: 'Users',
    type: MenuType.Parent,
    children: [
      {
        key: 'reset-password-by-address',
        icon: 'markunread_mailbox',
        label: 'Reset password',
        path: '/reset-password-by-address',
        type: MenuType.Child,
      },
    ],
  },
  {
    key: 'partners',
    icon: 'handshake',
    label: 'Partners',
    path: 'partners',
    type: MenuType.Child,
  },
  {
    key: 'rewards',
    icon: 'emoji_events',
    label: 'Rewards',
    type: MenuType.Parent,
    children: [
      {
        key: 'reward-config',
        icon: 'star',
        label: 'Reward config',
        path: '/reward-configs',
        type: MenuType.Child,
      },
      {
        key: 'default-values',
        icon: 'military_tech',
        label: 'Default values',
        path: '/default-values',
        type: MenuType.Child,
      },
      {
        key: 'send-rewards',
        icon: 'send',
        label: 'Send rewards',
        path: '/send-rewards',
        type: MenuType.Child,
      },
      {
        key: 'custom-prize',
        icon: 'card_giftcard',
        label: 'Custom prizes',
        path: '/custom-prizes',
        type: MenuType.Child,
      },
    ],
  },
  {
    key: 'claim-rewards',
    icon: 'volunteer_activism',
    label: 'Claim rewards',
    type: MenuType.Parent,
    children: [
      {
        key: 'custom-prizes-winners',
        icon: 'markunread_mailbox',
        label: 'Custom prizes winners',
        path: '/custom-prizes-winners',
        type: MenuType.Child,
      },
      {
        key: 'claim-processes',
        icon: 'checklist',
        label: 'Claim processes',
        path: '/claim-processes',
        type: MenuType.Child,
      },
    ],
  },
];
