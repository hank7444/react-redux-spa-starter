import reducer from 'src/redux/modules/auth';

import { auth as cons } from 'redux/constants';

describe('redux/modules/auth', () => {

  describe('reducer', () => {

    let state = null;

    beforeEach(() => {
      state = reducer();
    });

    it('auth LOGIN_SUCCESS', () => {

      let action = null;
      let result = null;

      action = {
        type: cons.LOGIN_SUCCESS,
      };

      result = reducer(undefined, action);

      expect(result.get('login')).toBe(false);
      expect(result.get('loginSuc')).toBe(true);
      expect(result.get('loginErr')).toBe(false);
    });

  });

  describe('action', () => {

    afterEach(() => {
      mockAgent.clearRoutes();
    });
  });
});
