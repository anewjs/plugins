import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import queryString from 'query-string';

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
          search = config.search,
          rest = _objectWithoutPropertiesLoose(config, ["name", "method", "params", "search"]);

      return action(_extends({
        pathname: name ? router.get(name)[method](params) : store.get.pathname(),
        search: search || store.get.search()
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

export default (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      history = _ref.history,
      router = _ref.router;

  return function (store, options) {
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
            push: createByNameAction('push', history, router),
            replace: createByNameAction('replace', history, router),
            block: createAction('block', history, router)
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
            },
            key: function key(state) {
              return state.location.key;
            }
          },
          selectors: {
            search: function search(_ref2) {
              var get = _ref2.get;
              return [get.search, function (state, props) {
                return props;
              }, function (search, props) {
                return queryString.parse(search, props);
              }];
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