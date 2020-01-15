import React from 'react';

import Box from '../../layout/Box';

const ScenariosBoard = (props) => {
  return (
    <Box
      fit
      width="100%"
      height="100%"
      justifyContent="space-between"
      alignItems="stretch">
      {props.children}
    </Box>
  )
}

export default ScenariosBoard;
