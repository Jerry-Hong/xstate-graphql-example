import React from 'react';
import Menu from './Menu';
import { menuMachine, MENU_EVENTS } from '../../mechines/menu';
import { useMachine } from '@xstate/react';
import { Button } from 'grommet';

const Layout = ({ children }) => {
  const [_, send, service] = useMachine(menuMachine);

  return (
    <div>
      <Menu service={service}></Menu>
      <Button
        label="Open Menu"
        onClick={() => {
          send(MENU_EVENTS.OPEN);
        }}
      ></Button>
      {children}
    </div>
  );
};

export default Layout;
