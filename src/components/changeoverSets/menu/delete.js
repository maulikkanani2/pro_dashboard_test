import React from 'react';
import PropTypes from 'prop-types';

import { DELETE_CHANGEOVER_SET } from '../../../graphql/mutations/changeoverSets';
import { CHANGEOVER_SETS } from '../../../graphql/queries/changeoverSets';
import withDelete from '../../../wrappers/delete';
import withScenario from '../../../wrappers/scenario';
import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';

const ChangeoverSetDeleteMenuItem = ({ closeMenu, remove, updateDialog, ...rest }) => {
  console.log('propert',rest)
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
  where: { id: props.changeoverSet.id }
});

const updateChangeoverSets = (props) => {
  return (cache, { data: { deleteChangeoverSet } }) => {
    let { changeoverSets } = cache.readQuery({ query: CHANGEOVER_SETS });
    changeoverSets = changeoverSets.filter(changeoverSet => changeoverSet.id !== deleteChangeoverSet.id);
    cache.writeQuery({ query: CHANGEOVER_SETS, data: { changeoverSets } });
  };
};

ChangeoverSetDeleteMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  changeoverSet: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default withScenario(withDialog('changeoverSets')(
  withDelete(mapPropsToWhere, {
    mutation: DELETE_CHANGEOVER_SET,
    update: updateChangeoverSets,
  })(ChangeoverSetDeleteMenuItem)));
