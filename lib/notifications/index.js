import notificationsConfig from './notifications.config';
import * as actions from './notifications.actions';
import * as reducers from './notifications.reducers';
import * as listeners from './notifications.listeners';
import * as getters from './notifications.getters';
import * as selectors from './notifications.selectors';
import * as state from './notifications.state';
export default (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      max = _ref.max,
      limit = _ref.limit;

  return function (store, options) {
    notificationsConfig({
      max: max
    });

    if (limit) {
      state.positions.top = limit.top.reduce(function (top, position) {
        top[position] = state.positions.top[position];
        return top;
      }, {});
      state.positions.bottom = limit.bottom.reduce(function (bottom, position) {
        bottom[position] = state.positions.bottom[position];
        return bottom;
      }, {});
    }

    options.inject({
      modules: {
        notifications: {
          state: state,
          actions: actions,
          reducers: reducers,
          listeners: listeners,
          getters: getters,
          selectors: selectors
        }
      }
    });
  };
});