import { AnyAction } from '@reduxjs/toolkit';

export const setError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};