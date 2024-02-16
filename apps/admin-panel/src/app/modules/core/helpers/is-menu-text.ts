import { ChildMenuItem, MenuText } from '../types/menu-item';

export function isMenuText(
  menuItem: ChildMenuItem | MenuText,
): menuItem is MenuText {
  return (menuItem as MenuText).content !== undefined;
}
