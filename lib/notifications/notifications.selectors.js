/**
 | ------------------
 | Creator Selectors
 | ------------------
 */
var createPositionSelector = function createPositionSelector(type) {
  return function (store) {
    return [store.get.positions, function (args) {
      return args[0];
    }, function (positions, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$vertical = _ref.vertical,
          vertical = _ref$vertical === void 0 ? 'top' : _ref$vertical,
          _ref$horizontal = _ref.horizontal,
          horizontal = _ref$horizontal === void 0 ? 'right' : _ref$horizontal;

      return positions[vertical][horizontal][type];
    }];
  };
};
/**
 | ------------------
 | Selects
 | ------------------
 */


export var queue = createPositionSelector('queue');
export var notifications = createPositionSelector('notifications');