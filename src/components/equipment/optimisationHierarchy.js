import React from 'react';
import PropTypes from 'prop-types';

import EditableSelect from '../fields/editableSelect';
import { UPDATE_EQUIPMENT } from '../../graphql/mutations/equipment';
import { OPTIMISATION_HIERARCHIES } from '../../graphql/queries/optimisationHierarchies';
import withForm from '../../wrappers/form';
import { selectToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import withEditing from '../../wrappers/edit';

const EquipmentOptimisationHierarchy = (props) => {
  const onSave = () => {
    if (typeof props.getFormValues().optimisationHierarchy !== 'undefined')
      props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  const findHierarchy = event => {
    if (event.target.value !== "")
      return props.optimisationHierarchies.data.find(hierarchy => hierarchy.id === event.target.value);
  }

  let options = props.optimisationHierarchies.data ? props.optimisationHierarchies.data : [];

  if (!props.optimisationHierarchies.data || props.optimisationHierarchies.data.length === 0)
    options = [{ id: 0, externalId: 'No Optimisation Hierarchy' }];

  return (<EditableSelect
    editing={props.isEditing}
    variant={props.variant}
    options={options}
    displayField="externalId"
    selected={props.formValues.optimisationHierarchy}
    onClick={props.toggleEditing(true)}
    onSelect={props.onFieldChange('optimisationHierarchy', selectToValue(findHierarchy), onSave)}
  />);
};

const mapPropsToFields = props => ({
  optimisationHierarchy: props.equipment.optimisationHierarchy,
});

const mapPropsToMutationVariables = props => ({
  where: { id: props.equipment.id },
  data: { optimisationHierarchy: { connect: { id: props.getFormValues().optimisationHierarchy ? props.getFormValues().optimisationHierarchy.id : 0 } } },
});

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id },
});

EquipmentOptimisationHierarchy.propTypes = {
  equipment: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

EquipmentOptimisationHierarchy.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_EQUIPMENT,
  propName: 'update',
})(withQuery({
  mapToFilter: mapToQueryFilter,
  query: OPTIMISATION_HIERARCHIES,
  propName: 'optimisationHierarchies',
})(EquipmentOptimisationHierarchy)))));
