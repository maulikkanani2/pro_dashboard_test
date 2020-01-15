import React from 'react';

import Page, { PageTitle, PageTab, PageTabs } from '../components/page';
import withTabs from '../wrappers/tabs';
import EquipmentTab from './equipment/Equipment';
import EquipmentClasses from './equipment/EquipmentClasses';

const Equipment = (props) => {
  return (
    <Page>
      <PageTitle title="Equipment" />
      <PageTabs value={props.currentTab} onChange={props.changeTab}>
        <PageTab label="Equipment" />
        <PageTab label="Classes" />
      </PageTabs>
      {props.currentTab === 0 && <EquipmentTab />}
      {props.currentTab === 1 && <EquipmentClasses />}
    </Page >
  );
};

export default withTabs(Equipment);