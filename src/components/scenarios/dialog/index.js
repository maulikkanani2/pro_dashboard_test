import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import DateIcon from '@material-ui/icons/DateRange';

import { SCENARIO } from '../../../graphql/queries/scenarios';
import { SCENARIO_STATUS_COLORS } from '../../../constants';
import PerformanceChart from '../performanceChart';
import TimePeriod from '../time_periods';
import TimePeriodAdd from '../time_periods/add';
import ScenarioName from '../name';
import ScenarioDescription from '../description';
import ScenarioStart from '../start';
import Box from '../../layout/Box';
import Flex from '../../layout/Flex';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import ScenarioSelectMenuItem from '../menu/select';
import ScenarioDeleteMenuItem from '../menu/delete';
import ScenarioCloneMenuItem from '../menu/clone';
import Dialog, { DialogHeader, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import withQuery from '../../../wrappers/query';

class ScenarioDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, scenario: { data: scenario, loading } } = this.props;

    if (!scenario) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <VBox flex="1" justifyContent="space-between">
            <ScenarioName variant="title" scenario={scenario} />
            <ScenarioDescription variant="body1" scenario={scenario} />
          </VBox>
          <Box flex="1">
            <Chip
              style={{
                border: `1px solid ${SCENARIO_STATUS_COLORS[scenario.status]}`,
                color: SCENARIO_STATUS_COLORS[scenario.status],
                background: 'transparent',
                marginLeft: 32,
              }}
              label={scenario.status}
            />
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <ScenarioSelectMenuItem scenario={scenario} />
              <ScenarioCloneMenuItem scenario={scenario} />
              <ScenarioDeleteMenuItem scenario={scenario} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel label="Scenario Start" />
              <Field>
                <ScenarioStart scenario={scenario} variant="body1" />
                <FieldIcon><DateIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Time Periods" />
              <VBox>
                {scenario.timePeriods.map((timePeriod) => <TimePeriod key={timePeriod.id} timePeriod={timePeriod} scenario={scenario} />)}
                <TimePeriodAdd scenario={scenario} />
              </VBox>
            </FieldControl>
          </DialogColumn>
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel label="Performance" />
              <Flex>
                <PerformanceChart scenario={scenario} />
              </Flex>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.scenario.id
});

const mapPropsToSkip = props => !props.scenario;

ScenarioDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: SCENARIO,
  propName: 'scenario'
})(ScenarioDialog);
