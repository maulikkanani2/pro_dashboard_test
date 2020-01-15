import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocationIcon from '@material-ui/icons/LocationOn';

import { MATERIAL } from '../../../graphql/queries/materials';
import MaterialExternalId from '../externalId';
import MaterialDescription from '../description';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Flex from '../../layout/Flex';
import MaterialLocation from '../location';
import MaterialProperty from '../properties';
import MaterialPropertyAdd from '../properties/add';
import Menu from '../../menu';
import MaterialDeleteMenuItem from '../menu/delete';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import withQuery from '../../../wrappers/query';
import MaterialInventoryChart from '../inventoryChart';

class MaterialDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, materialDefinition: { data: material, loading } } = this.props;

    if (!material) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{material.externalId.substring(0, 2).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <MaterialExternalId variant="title" material={material} />
              <MaterialDescription variant="body1" material={material} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <MaterialDeleteMenuItem material={material} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="100%">
            <FieldControl>
              <FieldLabel label="Location" />
              <Field>
                <MaterialLocation material={material} variant="body1" />
                <FieldIcon><LocationIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Properties" />
              <VBox>
                {material.materialProperties.map((materialProperty) =>
                  <MaterialProperty
                    key={materialProperty.id}
                    materialProperty={materialProperty}
                    material={material}
                  />
                )}
                <MaterialPropertyAdd material={material}/>
              </VBox>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Inventory" />
              <Flex>
                <MaterialInventoryChart material={material} />
              </Flex>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.material.id
});

const mapPropsToSkip = props => !props.material;

MaterialDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: MATERIAL,
  propName: 'materialDefinition'
})(MaterialDialog);
