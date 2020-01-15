import React, { Component } from "react";
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { FormField } from '../../../form';
import { selectToValue } from '../../../../utils/fieldValueMapping';

class Classes extends Component {
  constructor(props) {
    super(props)
    this.state = { filterClasses: [], statecheck: false }
  }

  findClass = (event) => {
    return this.state.filterClasses.find((klass) => klass.id === event.target.value);
  }

  filterEquipmentClasses = (action) => {

    if (action === true) {
      this.setState({ filterClasses: this.props.equipmentClasses, statecheck: true })
      return;
    }

    let klasses = []
    this.props.equipments.map(equipment => {
      Object.keys(equipment.equipmentClasses).forEach((i) => {
        if (!klasses.find(o => o.externalId === equipment.equipmentClasses[i].externalId))
          klasses.push(equipment.equipmentClasses[i]);
      });
    })

    this.setState({ filterClasses: klasses, statecheck: false })
  }

  componentDidMount() {
    if (this.props.value === "") {
      this.setState({ statecheck: false })
      this.filterEquipmentClasses(false)
    } else {
      this.setState({ statecheck: true })
      this.filterEquipmentClasses(true)
    }
  }

  render() {
    const { value, onFieldChange, excludedClassIds } = this.props
    const { statecheck: includeIndividual } = this.state

    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={includeIndividual}
              onChange={(event) => {
                this.filterEquipmentClasses(event.target.checked)
              }}
            />
          }
          label="Include Individual"
        />
        <FormField>
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select fullWidth value={value} onChange={onFieldChange('klass', selectToValue(this.findClass))}>
              {this.state.filterClasses.map((klass) => {
                if (excludedClassIds.indexOf(klass.id) === -1) {
                  return <MenuItem key={klass.id} value={klass.id}>{klass.externalId}</MenuItem>
                }
              })}
            </Select>
          </FormControl>
        </FormField>
      </div>
    )
  }
}

Classes.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  equipmentClasses: PropTypes.array.isRequired,
  excludedClassIds: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired
}


Classes.defaultProps = {
  excludedClassIds: []
}

export default Classes