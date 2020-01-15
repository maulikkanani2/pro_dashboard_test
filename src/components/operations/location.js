import React from 'react';
import PropTypes from 'prop-types';

import EditableSelect from '../fields/editableSelect';
import { UPDATE_OPERATION } from '../../graphql/mutations/operations';
import { LOCATIONS } from '../../graphql/queries/locations';
import withForm from '../../wrappers/form';
import { selectToValue } from '../../utils/fieldValueMapping';
import withMutation from '../../wrappers/mutation';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import withEditing from '../../wrappers/edit';

const OperationLocation = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  const findLocation = event => props.hierarchyScopes.data.find(hierarchyScope => hierarchyScope.id === event.target.value);

  const options = props.hierarchyScopes.data ? props.hierarchyScopes.data : [];

  return (<EditableSelect
    editing={props.isEditing}
    variant={props.variant}
    options={options}
    displayField="externalId"
    selected={props.formValues.hierarchyScope}
    onClick={props.toggleEditing(true)}
    onSelect={props.onFieldChange('hierarchyScope', selectToValue(findLocation), onSave)}
  />);
};

const mapPropsToFields = props => ({
  hierarchyScope: props.operation.hierarchyScope,
});

const mapPropsToMutationVariables = props => ({
  where: { id: props.operation.id },
  data: { hierarchyScope: { connect: { id: props.getFormValues().hierarchyScope.id } } },
});

const mapToQueryFilter = props => ({
  scenario: { id: props.scenario.id },
});

OperationLocation.propTypes = {
  operation: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

OperationLocation.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'update',
})(withQuery({
  mapToFilter: mapToQueryFilter,
  query: LOCATIONS,
  propName: 'hierarchyScopes',
})(OperationLocation)))));
