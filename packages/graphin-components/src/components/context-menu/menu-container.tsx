import React, { ReactElement } from 'react';
import { Menu } from 'antd'; // 'antd';

import { Graph } from '@antv/g6';

const MenuItem = Menu.Item;

export interface MenuItemType {
  key: string;
  visible?: boolean;
  /** @ant-design/icons */
  iconType?: ReactElement | HTMLElement;
  title?: string;
  width?: number;
  height?: number;
  onClick?: (props: ContainerProps) => void;
  /** user defined render function */
  render?: (props: ContainerProps, index: number) => ReactElement;
}

interface ContainerProps {
  graph: Graph;
  menu: MenuItemType[];
  onClose: () => void;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { menu, onClose } = props;

  const onClickMenuItem = (item: MenuItemType) => {
    onClose();
    // call user defined menu item onClick callback
    if (item.onClick) item.onClick(props);
  };

  const menuItems = menu
    .filter((item) => !(item.visible === false)) // item.visible 不传时默认可见
    .map((item, index) => {
      return (
        <MenuItem key={item.key} className={item.key} onClick={() => onClickMenuItem(item)}>
          {item.render ? (
            item.render(props, index)
          ) : (
            <>
              {item.iconType}
              {item.title}
            </>
          )}
        </MenuItem>
      );
    });

  return (
    <div className="graphin-context-menu">
      <Menu>{menuItems}</Menu>
    </div>
  );
};

export default Container;
