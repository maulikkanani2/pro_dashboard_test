import React from 'react';
import { connect } from 'react-redux';

const withScenario = WrappedComponent => {
  const mapStateToProps = state => ({
    scenario: state.scenarios.current
  });

  const component = (props) => {
    return (
      <WrappedComponent {...props} />
    )
  }

  return connect(mapStateToProps)(component);
};

export default withScenario;
