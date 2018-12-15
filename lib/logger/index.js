export default (function (settings) {
  if (settings === void 0) {
    settings = {};
  }

  return function (store) {
    var _settings = settings,
        production = _settings.production;

    if (process.env.NODE_ENV !== 'production' || production) {
      store.subscribe(function (action, args) {
        console.group(action);
        console.log("args:", args);
        console.log("state:", store.get());
        console.groupEnd(action);
      });
    }
  };
});