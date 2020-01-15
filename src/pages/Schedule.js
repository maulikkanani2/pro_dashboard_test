import React from 'react';
import PropTypes from 'prop-types';

import withScenario from '../wrappers/scenario';
import Auth from '../utils/auth';


const ScenarioSchedule = props => {
  const auth = new Auth();
  const {isReadOnly, isUndocked} = props;
  const popOutUrl = isUndocked ? '' : `${window.location.origin}/scenarios/${props.scenario.id}/schedule/undock`;

  const urlParams = [
    `scenario=${props.scenario.id}`, 
    `token=${auth.getToken()}`, 
    `readOnly=${isReadOnly ? 'true' : 'false'}`, 
    `popOutUrl=${popOutUrl}`
  ]

  return (
    <iframe
      src={`${window.config.schedulerUrl}?${urlParams.join('&')}`}
      title="scheduler"
      id="scheduler"
      style={{
        display: 'block',
        height: '100vh',
        width: '100%',
        border: 'none',
      }}
    />
  );
}

ScenarioSchedule.propTypes = {
  scenario: PropTypes.object.isRequired,
  isReadOnly : PropTypes.bool
};

export default withScenario(ScenarioSchedule);

