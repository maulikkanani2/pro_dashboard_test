import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { DateTimePicker } from 'material-ui-pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { UPDATE_PERSON } from '../../../graphql/mutations/personnel';
import Form, { FormBody, FormButtons, FormField } from '../../form';
import withScenario from '../../../wrappers/scenario';
import withMutation from '../../../wrappers/mutation';
import withForm from '../../../wrappers/form';
import { dateToValue } from '../../../utils/fieldValueMapping';
import { DATE_TIME_FORMAT } from '../../../constants';

class DowntimePeriodForm extends Component {
  constructor(props) {
    super(props);
    this.state = { startTime: '', endTime: '' }
  }

  setTime = () => {
    this.setState({
      startTime: this.props.downtimePeriod
        ? this.props.downtimePeriod.startTime
        : new Date(),
      endTime: this.props.downtimePeriod ? this.props.downtimePeriod.endTime : new Date(),
    });
  }

  componentDidMount() {
    this.setTime();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  onSave = () => {
    this.props.update.execute().then(() => {
      this.props.onCancel();
    });
  };

  onChange = event => {
    if (event.target.checked) {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);
      this.setState({
        startTime: start,
        endTime: end
      });
      this.props.formValues.startTime = start;
      this.props.formValues.endTime = end;
    } else {
      this.setTime();
      this.props.formValues.startTime = this.props.downtimePeriod
        ? this.props.downtimePeriod.startTime
        : new Date();
      this.props.formValues.endTime = this.props.downtimePeriod ? this.props.downtimePeriod.endTime : new Date();
    }
  }

  onChangelDatePickerChange = (event, field) => {
    this.setState({
      [field.name]: event
    });
  }

  render() {
    return (
      <Form>
        <FormBody>
          <FormField>
            <DateTimePicker
              fullWidth
              label="Start Date"
              format={DATE_TIME_FORMAT}
              value={this.state.startTime}
              onChange={(event) => {
                this.onChangelDatePickerChange(event, { name: 'startTime' });
                this.props.onFieldChange('startTime', event);
                this.props.formValues.startTime = event;
              }}
            />
          </FormField>
          <FormField>
            <DateTimePicker
              fullWidth
              label="End Date"
              format={DATE_TIME_FORMAT}
              value={this.state.endTime}
              onChange={(event) => {
                this.onChangelDatePickerChange(event, { name: 'endTime' });
                this.props.onFieldChange('endTime', event)
                this.props.formValues.endTime = event;
              }}
            />
          </FormField>
          <FormField>
            <FormControlLabel
              control={
                <Checkbox onChange={this.onChange} value="allday" color="primary" />
              }
              label="All day"
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
  startTime: props.downtimePeriod
    ? props.downtimePeriod.startTime
    : new Date(),
  endTime: props.downtimePeriod ? props.downtimePeriod.endTime : new Date(),
});

const mapPropsToMutationVariables = props => {
  if (props.downtimePeriod) {
    return {
      where: { id: props.person.id },
      data: {
        downtimePeriods: {
          update: {
            data: {
              startTime: props.getFormValues().startTime,
              endTime: props.getFormValues().endTime,
            },
            where: { id: props.downtimePeriod.id },
          },
        },
      },
    };
  } else {
    return {
      where: { id: props.person.id },
      data: {
        downtimePeriods: {
          create: {
            startTime: props.getFormValues().startTime,
            endTime: props.getFormValues().endTime,
          },
        },
      },
    };
  }
};

const validations = [
  {
    function: (variables, props) => {
      return !!(props.getFormValues().startTime &&
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
      mutation: UPDATE_PERSON,
      propName: 'update',
      validations,
    })(DowntimePeriodForm)
  )
);
