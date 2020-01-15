import React from 'react';
import PropTypes from 'prop-types';
import { Board, Lane, Card, moveCard, reorderCard, reorderLane } from 'tinban';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { SCENARIOS } from '../graphql/queries/scenarios';
import { UPDATE_SCENARIO } from '../graphql/mutations/scenarios';
import ScenarioCard from '../components/scenarios/board/card';
import ScenarioTypeLane from '../components/scenarios/board/lane';
import ScenariosBoard from '../components/scenarios/board/board';
import ScenariosForm from '../components/scenarios/board/form';
import ScenarioDialog from '../components/scenarios/dialog';
import { SCENARIO_STATUS_COLORS } from '../constants';
import withQuery from '../wrappers/query';
import withMutation from '../wrappers/mutation';
import Box from '../components/layout/Box';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import withDialog from '../wrappers/dialog';
import withAdd from '../wrappers/add';
import Search from '../components/fields/search';

const getLanes = (scenarios) => {
  return ['Draft', 'Proposed', 'Published', 'Complete'].reduce((acc, status) => {
    const statusScenarios = scenarios.filter(scenario => scenario.status === status);
    return [...acc, {
      id: status, title: status, barColor: SCENARIO_STATUS_COLORS[status], cards: statusScenarios,
    }];
  }, []);

}

class Scenarios extends React.Component {
  constructor(props) {
    super(props);

    const scenarios = props.scenarios.data ? props.scenarios.data : [];
    const lanes = getLanes(scenarios);
    this.state = { lanes };
  }

  componentWillReceiveProps(nextProps) {
    const scenarios = nextProps.scenarios.data ? nextProps.scenarios.data : [];
    const lanes = getLanes(scenarios);
    this.setState({ lanes });
  }

  componentDidMount() {
    localStorage.removeItem('Scenario');
  }

  render() {
    let { lanes } = this.state;

    const updateFilter = (event) => {
      this.props.updateFilter(event.target.value).then(() => {
        this.props.scenarios.refetch();
      });
    }

    const clearFilter = () => {
      this.props.updateFilter('').then(() => {
        this.props.scenarios.refetch();
      });
    }

    return (
      <Page>
        <PageTitle title="My Scenarios" />
        <PageActions>
          <Box alignItems="center">
            <Search onChange={updateFilter} onClear={clearFilter} value={this.props.queryText} />
          </Box>
          <Box flex="1" justifyContent="flex-end" alignItems="center">
            <Button variant="fab" color="primary" onClick={this.props.toggleAdding(true)}>
              <AddIcon />
            </Button>
          </Box>
        </PageActions>
        <PageBody isLoading={this.props.scenarios.loading}>
          <Board>
            <ScenariosBoard>
              {
                lanes.map((lane, laneIndex) => (
                  <Lane
                    key={lane.id}
                    lane={lane}
                    index={laneIndex}
                    canDropCard={() => true}
                    onReorder={(fromIndex, toIndex) => {
                      reorderLane(lanes, fromIndex, toIndex);

                      this.setState({ lanes });
                    }}
                    onCardDrop={(cardId, fromLane) => {
                      moveCard(lanes, cardId, fromLane, lane.id);

                      const where = { id: cardId };
                      const data = { updatedAt: new Date(), status: lane.id };
                      this.props.update.execute({ where, data });

                      this.setState({ lanes });
                    }}
                  >
                    {({ connect: connectLane, isDraggingLane, isOver }) => connectLane((
                      <div style={{ zIndex: 10000, flex: '1', margin: 8 }}>
                        <ScenarioTypeLane isDragging={isDraggingLane} isOver={isOver} lane={lane}>
                          {lane.id === 'Draft' && this.props.isAdding && <ScenariosForm onCancel={this.props.toggleAdding(false)} />}
                          {lane.cards.map((card, cardIndex) => (
                            <Card
                              key={card.id}
                              card={card}
                              index={cardIndex}
                              laneId={lane.id}
                              onReorder={(fromIndex, toIndex) => {
                                reorderCard(lanes, lane.id, fromIndex, toIndex);

                                this.setState({ lanes });
                              }}
                            >
                              {({ connect: connectCard, isDraggingCard }) => connectCard((
                                <div style={{ zIndex: 10001 }}>
                                  <ScenarioCard isDragging={isDraggingCard} card={card} />
                                </div>
                              ))}
                            </Card>
                          ))}
                        </ScenarioTypeLane>
                      </div>
                    ))}
                  </Lane>
                ))
              }
            </ScenariosBoard>
          </Board>
        </PageBody>
        <ScenarioDialog
          handleClose={() => { this.props.updateDialog(null); }}
          open={!!this.props.dialog}
          scenario={this.props.dialog}
        />
      </Page>
    );
  }
}

const mapToFilter = (props, query) => {
  let where = {};

  if (query) {
    where = {
      ...where,
      or: [{ name_like: `%${query}%` }, { description_like: `%${query}%` }]
    }
  }

  return where;
};

Scenarios.propTypes = {
  scenarios: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  update: PropTypes.func.isRequired,
};

Scenarios.defaultProps = {
  dialog: null,
};

export default withQuery({
  mapToFilter,
  orderBy: ["name ASC"],
  query: SCENARIOS,
  propName: 'scenarios',
})(withMutation(null, {
  mutation: UPDATE_SCENARIO,
  propName: 'update',
})(withDialog('scenarios')(withAdd(Scenarios))));
