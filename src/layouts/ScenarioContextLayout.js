import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ScenarioNav from '../components/navigation/ScenarioNav';
import Box from '../components/layout/Box';
import ScenarioSchedule from '../pages/Schedule';
import Equipment from '../pages/Equipment';
import Personnel from '../pages/Personnel';
import Locations from '../pages/Locations';
import Availability from '../pages/Availability';
import Materials from '../pages/Materials';
import Orders from '../pages/Orders';
import Operations from '../pages/Operations';
import Import from '../pages/Import';
import Optimisation from '../pages/Optimisation';

const ScenarioContextLayout = ({ scenario }) => (
  <Box fit>
    <ScenarioNav scenario={scenario} />
    <Box fit id="dashboardBody" style={{ overflowY: 'auto' }}>
      <Switch>
        {/* <Route path="/scenarios/:id/optimisation" component={ScenarioSchedule} /> */}
        <Route path="/scenarios/:id/personnel" component={Personnel} />
        <Route path="/scenarios/:id/operations" component={Operations} />
        <Route path="/scenarios/:id/locations" component={Locations} />
        <Route path="/scenarios/:id/materials" component={Materials} />
        <Route path="/scenarios/:id/availability" component={Availability} />
        <Route path="/scenarios/:id/equipment" component={Equipment} />
        <Route path="/scenarios/:id/orders" component={Orders} />
        <Route path="/scenarios/:id/schedule" component={ScenarioSchedule} />
        <Route path="/scenarios/:id/optimisation" component={Optimisation} />
        <Route path="/scenarios/:id/import" component={Import} />
        <Redirect to={`/scenarios/${scenario.id}/import`} />
      </Switch>
    </Box>
  </Box>
);

const mapStateToProps = state => ({
  scenario: state.scenarios.current,
});

export default withRouter(connect(mapStateToProps)(ScenarioContextLayout));
