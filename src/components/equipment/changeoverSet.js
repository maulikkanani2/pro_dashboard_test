import React from 'react';
import PropTypes from 'prop-types';

import EditableSelect from '../fields/editableSelect';
import { UPDATE_EQUIPMENT } from '../../graphql/mutations/equipment';
import { CHANGEOVER_SETS } from '../../graphql/queries/changeoverSets';
import withForm from '../../wrappers/form';
import { selectToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import withEditing from '../../wrappers/edit';

const EqiuipmentChangeoverSet = (props) => {
  const onSave = (event) => {
    if (typeof props.getFormValues().changeoverSet !== 'undefined')
      props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  const findChangeoverSet = event => {
    if (event.target.value !== "")
      return props.changeoverSets.data.find(changeoverSet => changeoverSet.id === event.target.value);
  }

  let options = props.changeoverSets.data ? props.changeoverSets.data : [];

  if (!props.changeoverSets.data || props.changeoverSets.data.length === 0)
    options = [{ id: 0, name: 'No Changeoverset' }];

  return (<EditableSelect
    editing={props.isEditing}
    variant={props.variant}
    options={options}
    selected={props.formValues.changeoverSet}
    onClick={props.toggleEditing(true)}
    onSelect={props.onFieldChange('changeoverSet', selectToValue(findChangeoverSet), onSave)}
  />);
};

const mapPropsToFields = props => ({
  changeoverSet: props.equipment.changeoverSet,
});

const mapPropsToMutationVariables = props => ({
  where: { id: props.equipment.id },
  data: { changeoverSet: { connect: { id: props.getFormValues().changeoverSet ? props.getFormValues().changeoverSet.id : 0 } } },
});

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id },
});

EqiuipmentChangeoverSet.propTypes = {
  equipment: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

EqiuipmentChangeoverSet.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_EQUIPMENT,
  propName: 'update',
})(withQuery({
  mapToFilter: mapToQueryFilter,
  query: CHANGEOVER_SETS,
  propName: 'changeoverSets',
})(EqiuipmentChangeoverSet)))));
