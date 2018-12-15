import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import defaultStorage from './storage';
export default (function (settings) {
  if (settings === void 0) {
    settings = {};
  }

  return function (store, options) {
    var _settings = settings,
        key = _settings.key,
        _settings$storage = _settings.storage,
        storage = _settings$storage === void 0 ? defaultStorage : _settings$storage,
        _settings$parser = _settings.parser,
        parser = _settings$parser === void 0 ? JSON.parse : _settings$parser,
        _settings$serializer = _settings.serializer,
        serializer = _settings$serializer === void 0 ? JSON.stringify : _settings$serializer;
    var localState = storage.getItem(key);
    options.inject({
      modules: {
        persist: {
          state: {
            rehydrated: false
          },
          reducers: {
            rehydrate: function rehydrate(state) {
              return {
                rehydrated: true
              };
            }
          }
        }
      }
    });

    if (localState) {
      options.inject({
        state: parser(localState)
      });
    }

    store.subscribe(function () {
      var _store$get = store.get(),
          persist = _store$get.persist,
          state = _objectWithoutPropertiesLoose(_store$get, ["persist"]);

      if (!persist.rehydrated) {
        store.commit.persist.rehydrate();
      }

      storage.setItem(key, serializer(state));
    });
  };
});