import React from 'react';
import Tab from '@material-ui/core/Tab';

const PageTab = ({ children, ...props }) => {
  return <Tab {...props}>{children}</Tab>
};

export default PageTab;