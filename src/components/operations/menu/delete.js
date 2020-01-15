import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_OPERATION } from '../../../graphql/mutations/operations';
import { OPERATIONS } from '../../../graphql/queries/operations';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const OperationDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
  const handler = () => {
    remove.execute().then(() => {
      updateDialog(null);
    });
  }

  return (
    <DeleteMenuItem
      handler={handler}
      closeMenu={closeMenu} />
  );
};

const mapPropsToWhere = props => ({
  where: { id: props.operation.id }
});

const updateOperations = (props) => {
  return (cache, { data: { deleteOperationsDefinitionClass } }) => {
    let { operationsDefinitionClasses } = cache.readQuery({ query: OPERATIONS });
    operationsDefinitionClasses = operationsDefinitionClasses.filter(operation => operation.id !== deleteOperationsDefinitionClass.id);
    cache.writeQuery({ query: OPERATIONS, data: { operationsDefinitionClasses } });
  };
};

OperationDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  operation: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('operations')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_OPERATION,
    update: updateOperations,
  })(OperationDeleteMenuItem)));

