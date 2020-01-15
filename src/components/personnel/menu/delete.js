import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_PERSON } from '../../../graphql/mutations/personnel';
import { PERSONNEL } from '../../../graphql/queries/personnel';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';
import { PERSONNEL_CLASSES } from '../../../graphql/queries/personnelClasses';

let PersonDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
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
  where: { id: props.person.id }
});

const updatePersonnel = (props) => {
  return (cache, { data: { deletePerson } }) => {
    let { persons } = cache.readQuery({ query: PERSONNEL });
    persons = persons.filter(person => person.id !== deletePerson.id);
    cache.writeQuery({ query: PERSONNEL, data: { persons } });

    try {
      let { personnelClasses } = cache.readQuery({ query: PERSONNEL_CLASSES });
      personnelClasses = personnelClasses.filter(personnelClass => personnelClass.externalId !== props.person.externalId);
      cache.writeQuery({ query: PERSONNEL_CLASSES, data: { personnelClasses } });
    } catch (e) { }
  };
};

PersonDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('personnel')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_PERSON,
    update: updatePersonnel,
  })(PersonDeleteMenuItem)));
