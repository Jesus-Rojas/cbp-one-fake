import cn from 'classnames';
import Collapse from '@mui/material/Collapse';
import { Icon } from '@mui/material';
import { isMenuText } from '../../helpers/is-menu-text';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menu } from '../../constants/menu';
import Paper from '@mui/material/Paper';
import styles from './side-bar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MenuItem, MenuType } from '../../types/menu-item';

export function SideBar() {
  const navigate = useNavigate();
  const [menuState, setMenuState] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setMenuState((state) => {
      state[key] = !state[key];
      return { ...state };
    });
  };

  const menuItemClick = (menuItem: MenuItem) => () => {
    if (menuItem.type === MenuType.Child) {
      navigate(menuItem.path);
      return;
    }

    toggleMenu(menuItem.key);
  };

  const menuItemHelperText = (menuItem: MenuItem) => {
    return menuItem.type === MenuType.Parent
      ? menuItem.children
          .map((childItem) => (isMenuText(childItem) ? null : childItem.label))
          .filter((item) => !!item)
          .join(', ')
          .replace(/, ([^,]*)$/, ' and $1')
      : '';
  };

  return (
    <Paper id={styles['side-bar-container']} elevation={0}>
      <List component="nav">
        <div>
          {menu.map((menuItem) => (
            <span key={menuItem.key}>
              <ListItemButton
                className={styles['list-item']}
                onClick={menuItemClick(menuItem)}
              >
                <ListItemIcon className={styles['list-icon']}>
                  <Icon className={styles['icon']}>{menuItem.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={menuItem.label}
                  secondary={menuItemHelperText(menuItem)}
                  secondaryTypographyProps={{
                    display: menuState[menuItem.key] ? 'none' : 'inherit',
                    fontSize: 12,
                    lineHeight: '16px',
                    noWrap: true,
                  }}
                />
                {menuItem.type === MenuType.Parent && (
                  <KeyboardArrowDown
                    className={cn(styles['keyboard-arrow'], {
                      [styles['rotate']]: menuState[menuItem.key],
                    })}
                  />
                )}
              </ListItemButton>
              {menuItem.type === MenuType.Parent && (
                <Collapse
                  in={menuState[menuItem.key]}
                  timeout="auto"
                  unmountOnExit
                >
                  {menuItem.children.map((childMenuItem) => {
                    if (isMenuText(childMenuItem)) {
                      return (
                        <div
                          key={childMenuItem.key}
                          className={styles['menu-label']}
                        >
                          {childMenuItem.content}
                        </div>
                      );
                    }
                    return (
                      <Link
                        className={styles['link']}
                        key={childMenuItem.key}
                        to={childMenuItem.path}
                      >
                        <ListItemButton className={styles['list-item-menu']}>
                          <ListItemIcon>
                            <Icon className={styles['icon']}>
                              {childMenuItem.icon}
                            </Icon>
                          </ListItemIcon>
                          <ListItemText primary={childMenuItem.label} />
                        </ListItemButton>
                      </Link>
                    );
                  })}
                </Collapse>
              )}
            </span>
          ))}
        </div>
      </List>
    </Paper>
  );
}
