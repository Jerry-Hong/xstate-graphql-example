import React from 'react';
import styled from 'styled-components';
import { useService } from '@xstate/react';
import { MENU_STATES, MENU_EVENTS } from '../../mechines/menu';
import { Button } from 'grommet';
import * as Icons from 'grommet-icons';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background-color: #f0f0f0;
`;

const Menu = ({ service }) => {
  const [current, send] = useService(service);

  return current.matches(MENU_STATES.OPENED) ? (
    <Container>
      <Button
        icon={<Icons.Close />}
        onClick={() => {
          send(MENU_EVENTS.CLOSE);
        }}
      />
    </Container>
  ) : null;
};

export default Menu;
