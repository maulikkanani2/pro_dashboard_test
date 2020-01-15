import React from 'react';
import Button from '@material-ui/core/Button';
import { TimePicker } from 'material-ui-pickers';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import {
  UPDATE_AVAILABILITY_TEMPLATE,
} from '../../../graphql/mutations/availabilityTemplates';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import { dateToMilliseconds, millisecondsToDate } from '../../../utils/date';
import { dateToValue, selectToValue } from '../../../utils/fieldValueMapping';
import { DAYS_OF_THE_WEEK, TIME_FORMAT } from '../../../constants';

class AvailabilityItemForm extends React.Component {
  state = { id: [] };

  componentDidMount() {
    if (this.props.availabilityItem)
      this.setState({ id: [this.props.availabilityItem.dayOfTheWeek] });
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
    this.setFormValues(event.target.value);
  };

  setFormValues(dayIds) {
    let days = [];
    dayIds.map(day => {
      days.push({
        id: DAYS_OF_THE_WEEK[day].id,
        name: DAYS_OF_THE_WEEK[day].name,
      });
    });
    this.props.formValues.dayOfTheWeek = days;
  }

  selectedValue = selected => {
    let dayString = [];
    selected.map(day => {
      dayString.push(DAYS_OF_THE_WEEK[day].name);
    });
    return dayString.join(', ');
  };

  onSave = () => {
    this.props.update.execute().then(() => {
      this.props.onCancel();
    });
  };

  findDayOfTheWeek = event => {
    return DAYS_OF_THE_WEEK.find(dotw => dotw.id === event.target.value);
  };

  render() {
    return (
      <Form>
        <FormBody>
          <FormField>
            <FormControl fullWidth>
              <InputLabel>Day of the Week</InputLabel>
              <Select
                multiple
                multiline
                fullWidth
                value={this.state.id}
                onChange={this.handleChange}
                renderValue={this.selectedValue}
              >
                {DAYS_OF_THE_WEEK.map(dotw => (
                  <MenuItem key={dotw.id} value={dotw.id}>
                    <ListItemText primary={dotw.name} />
                    <Checkbox
                      color="primary"
                      checked={this.state.id.indexOf(dotw.id) > -1}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormField>
          <FormField>
            <TimePicker
              fullWidth
              label="Start Time"
              format={TIME_FORMAT}
              value={this.props.formValues.startTime}
              onChange={this.props.onFieldChange('startTime', dateToValue)}
            />
          </FormField>
          <FormField>
            <TimePicker
              fullWidth
              label="End Time"
              format={TIME_FORMAT}
              value={this.props.formValues.endTime}
              onChange={this.props.onFieldChange('endTime', dateToValue)}
            />
          </FormField>
        </FormBody>
        <FormButtons>
          <Button size="small" onClick={this.props.onCancel}>Cancel</Button>
          <Button disabled={this.props.update.loading} color="primary" size="small" onClick={this.onSave}>Save</Button>
        </FormButtons>
      </Form>
    );
  }
}

const mapPropsToFields = props => ({
  dayOfTheWeek: props.availabilityItem
    ? DAYS_OF_THE_WEEK.find(
      dotw => dotw.id === props.availabilityItem.dayOfTheWeek
    )
    : { id: '', name: '' },
  startTime: props.availabilityItem
    ? millisecondsToDate(props.availabilityItem.startTime)
    : new Date(),
  endTime: props.availabilityItem
    ? millisecondsToDate(props.availabilityItem.endTime)
    : new Date(),
});

const mapPropsToMutationVariables = props => {
  if (props.availabilityItem) {
    let query = {
      where: { id: props.availability.id },
      data: {
        availabilityTemplateItems: {
          update: {
            data: {
              startTime: dateToMilliseconds(props.getFormValues().startTime),
              endTime: dateToMilliseconds(props.getFormValues().endTime),
              dayOfTheWeek: props.getFormValues().dayOfTheWeek.id,
            },
            where: { id: props.availabilityItem.id },
          },
          create: [],
        },
      },
    };
    props.formValues.dayOfTheWeek.length && props.formValues.dayOfTheWeek.map(value => {
      if (props.availabilityItem.dayOfTheWeek === value.id) return;
      let q = {
        startTime: dateToMilliseconds(props.getFormValues().startTime),
        endTime: dateToMilliseconds(props.getFormValues().endTime),
        dayOfTheWeek: value.id,
      };
      query.data.availabilityTemplateItems.create.push(q);
    });
    return query;
  } else {
    let query = {
      where: { id: props.availability.id },
      data: {
        availabilityTemplateItems: {
          create: [],
        },
      },
    };
    props.formValues.dayOfTheWeek.length && props.formValues.dayOfTheWeek.map(value => {
      let q = {
        startTime: dateToMilliseconds(props.getFormValues().startTime),
        endTime: dateToMilliseconds(props.getFormValues().endTime),
        dayOfTheWeek: value.id,
      };
      query.data.availabilityTemplateItems.create.push(q);
    });
    return query;
  }
};

const validations = [
  {
    function: (variables, props) => {
      return !!(props.getFormValues().dayOfTheWeek.id !== '' &&
        props.getFormValues().startTime &&
        props.getFormValues().endTime);
    },
    message: 'All fields are required to be filled!',
  },
  {
    function: (variables, props) => {
      return (
        new Date(props.getFormValues().startTime) <
        new Date(props.getFormValues().endTime)
      );
    },
    message: 'End time must be after the start time!',
  },
];

export default withScenario(
  withForm(mapPropsToFields)(
    withMutation(mapPropsToMutationVariables, {
      mutation: UPDATE_AVAILABILITY_TEMPLATE,
      propName: 'update',
      validations,
    })(AvailabilityItemForm)
  )
);
