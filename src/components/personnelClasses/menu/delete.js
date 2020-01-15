import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_PERSONNEL_CLASS } from '../../../graphql/mutations/personnelClasses';
import { PERSONNEL_CLASSES } from '../../../graphql/queries/personnelClasses';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const PersonnelClassDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
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
  where: { id: props.personnelClass.id }
});

const updatePersonnelClass = (props) => {
  return (cache, { data: { deletePersonnelClass } }) => {
    let { personnelClasses } = cache.readQuery({ query: PERSONNEL_CLASSES });
    personnelClasses = personnelClasses.filter(personnelClass => personnelClass.id !== deletePersonnelClass.id);
    cache.writeQuery({ query: PERSONNEL_CLASSES, data: { personnelClasses } });
  };
};

PersonnelClassDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  personnelClass: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('personnel')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_PERSONNEL_CLASS,
    update: updatePersonnelClass,
  })(PersonnelClassDeleteMenuItem)));
