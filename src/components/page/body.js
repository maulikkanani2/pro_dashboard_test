import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import VBox from '../layout/VBox';
import Box from '../layout/Box';

const Body = (props) => {
  if (props.isLoading) {
    return (
      <Box center fit>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <VBox fit>
      {props.children}
    </VBox>
  )
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

Body.defaultProps = {
  isLoading: false,
};

export default Body;
