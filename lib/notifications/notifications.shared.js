import _extends from "@babel/runtime/helpers/esm/extends";
export var reducePositions = function reducePositions(positions, reducer) {
  return Object.keys(positions).reduce(function (positionsObj, vertical) {
    positionsObj[vertical] = Object.keys(positionsObj[vertical]).reduce(function (positionVerticalObject, horizontal) {
      var position = positionVerticalObject[horizontal];
      positionVerticalObject[horizontal] = _extends({}, position, reducer(_extends({
        vertical: vertical,
        horizontal: horizontal
      }, position)));
      return positionVerticalObject;
    }, positions[vertical]);
    return positionsObj;
  }, positions);
};
export var reduceAtPosition = function reduceAtPosition(positions, vertical, horizontal, reducer) {
  var _extends2, _extends3;

  var position = positions[vertical][horizontal];
  return _extends({}, positions, (_extends3 = {}, _extends3[vertical] = _extends({}, positions[vertical], (_extends2 = {}, _extends2[horizontal] = _extends({}, position, reducer(position)), _extends2)), _extends3));
};