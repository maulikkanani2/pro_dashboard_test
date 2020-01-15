import initialState from './initialState';
import { UPDATE_DIALOG, SHOW_AUTHETICATION_DIALOG } from '../actions/actionTypes';

export default function dialog(state = initialState.dialog, action) {
  switch (action.type) {
    case UPDATE_DIALOG:
      return { ...state, [action.data.entity]: action.data.object };
    case SHOW_AUTHETICATION_DIALOG:
      return { ...state, tokenrefresh: true }
    default:
      return state;
  }
}
