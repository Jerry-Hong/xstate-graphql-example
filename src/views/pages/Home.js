import React, { useCallback } from 'react';
import { useMachine } from '@xstate/react';
import { DataTable, CheckBox, Image, Box, Button } from 'grommet';
import * as Icons from 'grommet-icons';
import { launchesMechine, LAUNCHES_STATES, LAUNCHES_EVENTS } from '../../mechines';

const Home = () => {
  const [current, send] = useMachine(launchesMechine);
  const handleClick = useCallback(() => send(LAUNCHES_EVENTS.REFRESH), [send]);
  const handleRetry = useCallback(() => send(LAUNCHES_EVENTS.RETRY), [send]);

  return (
    <div>
      {current.matches(LAUNCHES_STATES.LOADING) && <h2>Loading...</h2>}
      {current.matches(LAUNCHES_STATES.LOADED) && (
        <>
          <Button
            onClick={handleClick}
            label="Refresh"
            icon={<Icons.Refresh size="medium" />}
          />
          <DataTable
            columns={[
              {
                property: 'mission_name',
                header: 'Mission Name',
                primary: true,
              },
              {
                property: 'static_fire_date_utc',
                header: 'Fire Date',
              },
              {
                property: 'launch_success',
                header: 'Launch Success',
                render: data => (
                  <CheckBox disabled checked={data.launch_success}></CheckBox>
                ),
              },
              {
                property: 'links.flickr_images',
                header: 'Image',
                render: data => (
                  <Box width="small" height="small">
                    <Image
                      fallback="no image"
                      fit="contain"
                      src={
                        data.links.flickr_images && data.links.flickr_images[0]
                      }
                    ></Image>
                  </Box>
                ),
              },
            ]}
            data={current.context.launches}
          />
        </>
      )}
      {current.matches(LAUNCHES_STATES.FAILURE) && (
        <div>
          <Button onClick={handleRetry} label="Retry"></Button>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
};

export default Home;