import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/pages/Home';
import { useMachine } from '@xstate/react';
import { launchesMechine } from './mechines';
import Layout from './views/layout/Layout';

function App() {
  const [current] = useMachine(launchesMechine);
  console.log(current);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
