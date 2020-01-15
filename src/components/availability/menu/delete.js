import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_AVAILABILITY_TEMPLATE } from '../../../graphql/mutations/availabilityTemplates';
import { AVAILABILITY_TEMPLATES } from '../../../graphql/queries/availabilityTemplates';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const AvailabilityDeleteMenuItem = ({ closeMenu, remove, updateDialog }) => {
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
  where: { id: props.availability.id }
});

const updateAvailabilities = (props) => {
  return (cache, { data: { deleteAvailabilityTemplate } }) => {
    let { availabilityTemplates } = cache.readQuery({ query: AVAILABILITY_TEMPLATES });
    availabilityTemplates = availabilityTemplates.filter(availability => availability.id !== deleteAvailabilityTemplate.id);
    cache.writeQuery({ query: AVAILABILITY_TEMPLATES, data: { availabilityTemplates } });
  };
};

AvailabilityDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  availability: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('availability')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_AVAILABILITY_TEMPLATE,
    update: updateAvailabilities,
  })(AvailabilityDeleteMenuItem)));
