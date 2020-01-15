import React from 'react';

import Page, { PageTitle, PageTab, PageTabs } from '../components/page';
import PersonnelTab from './Personnel/Personnel';
import PersonnelClasses from './Personnel/PersonnelClasses';
import withTabs from '../wrappers/tabs';

const Personnel = props => {
  return (
    <Page>
      <PageTitle title="Personnel" />
      <PageTabs value={props.currentTab} onChange={props.changeTab}>
        <PageTab label="Personnel" />
        <PageTab label="Classes" />
      </PageTabs>
      {props.currentTab === 0 && <PersonnelTab />}
      {props.currentTab === 1 && <PersonnelClasses />}
    </Page>
  );
};

export default withTabs(Personnel);
