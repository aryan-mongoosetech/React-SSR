import * as types from './actionConstants';

/* Notification */
export const setNotif = (payload) => ({
  type: types.SET_NOTIF,
  payload,
});

/* UI */
export const setUI = (payload) => ({
  type: types.SET_UI,
  payload,
});
