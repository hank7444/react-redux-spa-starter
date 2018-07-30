import { fromJS } from 'immutable';

import { error as cons } from '../constants';

const initialState = fromJS({
  error: false,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case cons.CLEAN_ERROR:
      return state.merge({
        error: false,
      });

    case cons.SET_ERROR:
      return state.merge({
        error: action.error,
      });

    default:
      return state;
  }
}
