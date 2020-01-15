import initialState from './initialState';
import { CHANGE_SCENARIO } from '../actions/actionTypes';

export default function scenarios(state = initialState.scenarios, action) {
  switch (action.type) {
    case CHANGE_SCENARIO:
      localStorage.setItem('Scenario', JSON.stringify(action.data))

      return { ...state, current: action.data };

    default:
      return state;
  }
}
