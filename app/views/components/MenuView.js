
import React, { useState } from 'react';

import DeviceInfo from 'react-native-device-info';
import { colors, Icon } from 'react-native-elements';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function MenuView(props) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const onLogout = () => {
    hideMenu();
    props._onLogout();
  }

  return (

      <Menu
        visible={visible}
        anchor={

            <Icon 
                name={'more-vertical'}
                type={'feather'}
                color={colors.black}
                size={20}
                onPress={showMenu}
            />
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={onLogout}>Logout</MenuItem>
        <MenuDivider />
        <MenuItem disabled>{`Version No - ${DeviceInfo.getVersion()}`}</MenuItem>
      </Menu>

  );
}