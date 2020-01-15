import React from 'react';
import PropTypes from 'prop-types';

import EditableText from '../../fields/editableText';
import { UPDATE_OPERATION } from '../../../graphql/mutations/operations';
import withForm from '../../../wrappers/form';
import { eventToValue } from '../../../utils/fieldValueMapping';
import withMutation from '../../../wrappers/mutation';
import withScenario from '../../../wrappers/scenario';
import withEditing from '../../../wrappers/edit';

const RoutingDuration = (props) => {
  const onSave = () => {
    props.update.execute().then(() => { props.toggleEditing(false)(); });
  };

  return (<EditableText
    classes={props.classes}
    editing={props.isEditing}
    text={props.formValues.duration}
    variant={props.variant}
    onSave={onSave}
    type="number"
    onClick={props.toggleEditing(true)}
    onChange={props.onFieldChange('duration', eventToValue)}
  />);
};

const mapPropsToFields = props => ({
  duration: props.routing.operationsSegments[0].duration,
});

const mapPropsToMutationVariables = props => ({
  where: { id: props.operation.id },
  data: {
    operationsDefinitions: {
      update: {
        data: {
          operationsSegments: {
            update: {
              where: { id: props.routing.operationsSegments[0].id },
              data: {
                duration: props.getFormValues().duration,
              }
            }
          }
        },
        where: { id: props.routing.id },
      }
    }
  },
});

const validations = [{
  function: (variables, props) => { return props.getFormValues().duration > 0 },
  message: 'Duration must be greater than 0!'
}];

RoutingDuration.propTypes = {
  operation: PropTypes.object.isRequired,
  routing: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
};

RoutingDuration.defaultProps = {
  classes: {},
  variant: 'body1',
};

export default withScenario(withEditing(withForm(mapPropsToFields)(withMutation(mapPropsToMutationVariables, {
  mutation: UPDATE_OPERATION,
  propName: 'update',
  validations,
})(RoutingDuration))));
