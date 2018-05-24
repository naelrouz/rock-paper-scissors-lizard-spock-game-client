export const SELECT_GESTURE = 'SELECT_GESTURE';
export const CLEAR_SELECTED_GESTURE = 'CLEAR_SELECTED_GESTURE';

export const selectGesture = gesture => ({
  type: SELECT_GESTURE,
  gesture
});

export const clearSelectedGesture = () => ({
  type: CLEAR_SELECTED_GESTURE
});
