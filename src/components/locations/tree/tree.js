import React from 'react';

import VBox from '../../layout/VBox';

const TreeView = (props) => {
  return (
    <VBox
      fit
      width="100%"
      height="100%"
      alignItems="stretch">
      {props.children}
    </VBox>
  )
}

export default TreeView;
