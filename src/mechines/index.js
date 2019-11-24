import { Machine, assign } from 'xstate';
import gql from 'graphql-tag';
import { client } from '../apollo';

const GET_LAUNCHES = gql`
  {
    launches(limit: 20, sort: "launch_date_local", order: "ASC") {
      details
      launch_success
      launch_date_local
      mission_name
      rocket {
        rocket {
          id
          wikipedia
        }
        fairings {
          recovered
        }
      }
      links {
        article_link
        video_link
        flickr_images
      }
      static_fire_date_utc
    }
  }
`;

export const LAUNCHES_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILURE: 'failure',
};

export const LAUNCHES_EVENTS = {
  REFRESH: 'REFRESH',
  RETRY: 'RETRY',
};

const getLaunches = () =>
  client
    .query({ query: GET_LAUNCHES, fetchPolicy: 'network-only' })
    .then(res => {
      if (res.errors) {
        throw res.errors;
      } else {
        return res.data;
      }
    });

export const launchesMechine = Machine({
  id: 'lanches',
  initial: LAUNCHES_STATES.LOADING,
  context: {
    launches: [],
  },
  states: {
    [LAUNCHES_STATES.LOADING]: {
      invoke: {
        src: getLaunches,
        onDone: {
          target: LAUNCHES_STATES.LOADED,
          actions: assign({
            launches: (_, event) => event.data.launches,
          }),
        },
        onError: {
          target: LAUNCHES_STATES.FAILURE,
        },
      },
    },
    [LAUNCHES_STATES.LOADED]: {
      on: {
        [LAUNCHES_EVENTS.REFRESH]: LAUNCHES_STATES.LOADING,
      },
    },
    [LAUNCHES_STATES.FAILURE]: {
      on: {
        [LAUNCHES_EVENTS.RETRY]: LAUNCHES_STATES.LOADING,
      },
    },
  },
});
