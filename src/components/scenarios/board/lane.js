import React from 'react';
import Typography from '@material-ui/core/Typography';

import VBox from '../../layout/VBox';

const ScenarioTypeLane = (props) => {
  return (
    <VBox style={{
      height: '100%',
      overflowY: 'auto',
      padding: 16,
      border: '1px solid #c4c4c4',
      borderTop: `3px solid ${props.lane.barColor}`,
      backgroundColor: '#fff'
    }}>
      <Typography variant="title" style={{ marginBottom: 24, fontWeight: 400 }}>
        {props.lane.title}
        <span style={{ color: '#bdbdbd', marginLeft: 8 }}>({props.lane.cards.length})</span>
      </Typography>
      {props.children}
    </VBox>
  )
}

export default ScenarioTypeLane;
