export var open = function open(state) {
  return state.open;
};
export var clearing = function clearing(state) {
  return state.clearing;
};
export var history = function history(state) {
  return state.history;
};
export var historyCount = function historyCount(state) {
  return state.history.length;
};
export var positions = function positions(state) {
  return state.positions;
};
export var positionsBottom = function positionsBottom(state) {
  return state.positions.bottom;
};