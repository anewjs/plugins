import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { createBrowserHistory } from 'history';

function createByNameAction(type, history, router) {
  var action = history[type];

  if (router) {
    return function (store, config) {
      if (typeof config === 'function') {
        return action(config(store, router));
      }

      var name = config.name,
          _config$method = config.method,
          method = _config$method === void 0 ? 'path' : _config$method,
          params = config.params,
          rest = _objectWithoutPropertiesLoose(config, ["name", "method", "params"]);

      return action(_extends({
        pathname: router.get(name)[method](method === 'data' && !params ? 'path' : params)
      }, rest));
    };
  }

  return action;
}

function createAction(type, history, router) {
  var action = history[type];

  if (router) {
    return function (store, arg) {
      if (typeof arg === 'function') {
        action(function () {
          return arg(store, router);
        });
      }

      return action(arg);
    };
  }

  return function (store, arg) {
    if (typeof arg === 'function') {
      action(function () {
        return arg(store);
      });
    }

    return action(arg);
  };
}

export default (function (settings) {
  if (settings === void 0) {
    settings = {};
  }

  return function (store, options) {
    var _ref = settings.configuration || settings,
        history = _ref.history;

    options.inject({
      modules: {
        router: {
          state: {
            action: history.action,
            location: history.location
          },
          reducers: {
            navigate: function navigate(state, change) {
              return change;
            }
          },
          actions: {
            listen: history.listen,
            go: history.go,
            goBack: history.goBack,
            goForward: history.goForward,
            canGo: history.canGo,
            push: createByNameAction('push', history, settings),
            replace: createByNameAction('replace', history, settings),
            block: createAction('block', history, settings)
          },
          getters: {
            action: function action(state) {
              return state.action;
            },
            location: function location(state) {
              return state.location;
            },
            pathname: function pathname(state) {
              return state.location.pathname;
            },
            hash: function hash(state) {
              return state.location.hash;
            },
            search: function search(state) {
              return state.location.search;
            },
            state: function state(_state) {
              return _state.location.state;
            }
          }
        }
      }
    });
    history.listen(function (location, action) {
      store.commit.router.navigate({
        action: action,
        location: location
      });
    });
  };
});