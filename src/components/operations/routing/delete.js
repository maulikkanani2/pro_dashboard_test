import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { UPDATE_OPERATION } from '../../../graphql/mutations/operations';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import withDialog from '../../../wrappers/dialog';

const RoutingDelete = ({ remove, updateDialog }) => {
  const handler = () => {
    remove.execute().then(() => {
      updateDialog(null);
    });
  }

  return (
    <Button onClick={handler}>Delete</Button>
  );
};

const mapPropsToWhere = props => ({
  data: {
    operationsDefinitions: {
      delete: [{ id: props.routing.id }],
    },
  },
  where: { id: props.operation.id }
});

RoutingDelete.propTypes = {
  routing: PropTypes.object.isRequired,
  operation: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('routing')(
  withDelete(mapPropsToWhere, {
    mutation: UPDATE_OPERATION,
  })(RoutingDelete)));
