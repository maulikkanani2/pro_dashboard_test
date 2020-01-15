import React, { Component } from "react";
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

    filterPersonnelClasses = (action) => {

        if (action === true) {
            this.setState({ filterClasses: this.props.personnelClasses, statecheck: true })
            return;
        }

        let klasses = []
        this.props.persons.map(person => {
            Object.keys(person.personnelClasses).forEach((i) => {
                if (!klasses.find(o => o.externalId === person.personnelClasses[i].externalId))
                    klasses.push(person.personnelClasses[i]);
            });
        })

        this.setState({ filterClasses: klasses, statecheck: false })
    }

    componentDidMount() {
        if (this.props.value === "") {
            this.setState({ statecheck: false })
            this.filterPersonnelClasses(false)
        } else {
            this.setState({ statecheck: true })
            this.filterPersonnelClasses(true)
        }
    }

    render() {
        return (
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={this.state.statecheck}
                            onChange={(event) => {
                                this.filterPersonnelClasses(event.target.checked)
                            }}
                        />
                    }
                    label="Include Individual"
                />
                <FormField>
                    <FormControl fullWidth>
                        <InputLabel>Class</InputLabel>
                        <Select fullWidth value={this.props.value} onChange={this.props.onFieldChange('klass', selectToValue(this.findClass))}>
                            {this.state.filterClasses.map((klass) => { return <MenuItem key={klass.id} value={klass.id}>{klass.externalId}</MenuItem> })}
                        </Select>
                    </FormControl>
                </FormField>
            </div>
        )
    }
}

export default Classes