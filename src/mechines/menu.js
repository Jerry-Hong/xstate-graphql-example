import { Machine } from 'xstate';

export const MENU_STATES = {
  CLOSED: 'closed',
  OPENED: 'opened',
};

export const MENU_EVENTS = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};

export const menuMachine = Machine({
  id: 'menu',
  initial: MENU_STATES.CLOSED,
  states: {
    [MENU_STATES.CLOSED]: {
      on: {
        [MENU_EVENTS.OPEN]: MENU_STATES.OPENED,
      },
    },
    [MENU_STATES.OPENED]: {
      on: {
        [MENU_EVENTS.CLOSE]: MENU_STATES.CLOSED,
      },
    },
  },
});
