export enum MenuType {
  Child = 'Child',
  Parent = 'Parent',
}

export interface BaseMenuItem {
  key: string;
  icon: string;
  label: string;
  type: MenuType;
}

export interface MenuText {
  key: string;
  content: string;
}

export interface ChildMenuItem extends BaseMenuItem {
  type: MenuType.Child;
  path: string;
}

export interface ParentMenuItem extends BaseMenuItem {
  type: MenuType.Parent;
  children: (ChildMenuItem | MenuText)[];
}

export type MenuItem = ParentMenuItem | ChildMenuItem;
