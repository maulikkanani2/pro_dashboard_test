import React from 'react';
import Typography from '@material-ui/core/Typography';

import VBox from './layout/VBox';

const EmptyState = ({ icon, title, description }) => {
  const iconChild = React.createElement(icon, { style: { height: 100, width: 100, color: '#c4c4c4', marginBottom: 8 } });

  return (
    <VBox fit alignItems="center" style={{ marginTop: '10%' }}>
      {iconChild}
      <Typography gutterBottom variant="headline">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </VBox>
  );
}

export default EmptyState;