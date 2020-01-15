import { CHANGE_SCENARIO } from './actionTypes';

export function changeScenario(scenario) {
  return {
    type: CHANGE_SCENARIO,
    data: scenario,
  }
}
