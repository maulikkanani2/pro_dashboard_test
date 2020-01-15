import React from 'react';

import Page, { PageTitle, PageTab, PageTabs } from '../components/page';
import withTabs from '../wrappers/tabs';
import ChangeoverSets from './optimisation/ChangeoverSets';
import OptimisationHierarchies from './optimisation/OptimisationHierarchies';
import OptimisationProperties from './optimisation/OptimisationProperties';

const Optimisation = (props) => {
  return (
    <Page>
      <PageTitle title="Optimisation" />
      <PageTabs value={props.currentTab} onChange={props.changeTab}>
        <PageTab label="Properties" />
        <PageTab label="Hierarchies" />
        <PageTab label="Changeovers" />
      </PageTabs>
      {props.currentTab === 0 && <OptimisationProperties />}
      {props.currentTab === 1 && <OptimisationHierarchies />}
      {props.currentTab === 2 && <ChangeoverSets />}
    </Page >
  );
};

export default withTabs(Optimisation);