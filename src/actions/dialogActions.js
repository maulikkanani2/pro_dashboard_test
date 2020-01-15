import { UPDATE_DIALOG, SHOW_AUTHETICATION_DIALOG } from './actionTypes';

export function updateDialog(entity, object) {
  return {
    type: UPDATE_DIALOG,
    data: { entity, object }
  }
}
export function showAuthenticationDialog() {
  return {
    type: SHOW_AUTHETICATION_DIALOG
  }
}