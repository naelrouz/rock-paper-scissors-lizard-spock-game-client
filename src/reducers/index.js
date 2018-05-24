import * as actions from '../actions';

const startState = {
  selectedGesture: null
};

export default (state = startState, action) => {
  const { type, gesture } = action;
  switch (type) {
    case actions.SELECT_GESTURE: {
      return { ...state, selectedGesture: gesture };
    }
    case actions.CLEAR_SELECTED_GESTURE: {
      return { ...state, selectedGesture: null };
    }

    default:
      return state;
  }
};
