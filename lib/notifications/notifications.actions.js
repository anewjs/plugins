import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION } from './notifications.constants';
import { notificationsData } from './notifications.data';
export var destroyNotification = function destroyNotification(_ref, key) {
  var commit = _ref.commit;
  commit.dismissNotification(key);
  setTimeout(function () {
    commit.destroyNotification(key);
  }, 340);
};
export var destroyNotifications = function destroyNotifications(_ref2) {
  var commit = _ref2.commit;
  commit.dismissNotifications();
  setTimeout(function () {
    commit.destroyNotifications();
  }, 340);
};
export var sendNotification = function sendNotification(_ref4, _ref3) {
  var batch = _ref4.batch,
      dispatch = _ref4.dispatch,
      core = _ref4.core;

  var _ref3$solo = _ref3.solo,
      solo = _ref3$solo === void 0 ? false : _ref3$solo,
      onUndo = _ref3.onUndo,
      onDismiss = _ref3.onDismiss,
      onTimeout = _ref3.onTimeout,
      onExited = _ref3.onExited,
      _ref3$vertical = _ref3.vertical,
      vertical = _ref3$vertical === void 0 ? 'top' : _ref3$vertical,
      _ref3$horizontal = _ref3.horizontal,
      horizontal = _ref3$horizontal === void 0 ? 'right' : _ref3$horizontal,
      options = _objectWithoutPropertiesLoose(_ref3, ["solo", "onUndo", "onDismiss", "onTimeout", "onExited", "vertical", "horizontal"]);

  var key = new Date().getTime();
  var isMobile = core.select.app.isMobile();
  options.key = key;
  options.vertical = vertical;
  options.horizontal = isMobile ? 'center' : horizontal;
  notificationsData[key] = {
    onUndo: onUndo,
    onDismiss: onDismiss,
    onTimeout: onTimeout,
    onExited: onExited
  };

  if (solo) {
    batch.closeNotifications();
  }

  batch.enqueueNotification(options);
  batch.done();
  dispatch.displayNotificaiton(options);
};
export var exitNotification = function exitNotification(_ref5, options) {
  var commit = _ref5.commit,
      dispatch = _ref5.dispatch;
  var displayDelay = TRANSITION_DELAY + TRANSITION_DOWN_DURATION + 40;
  commit.exitNotification(options);
  setTimeout(function () {
    dispatch.displayNotificaiton(options);
  }, displayDelay);
};
export var displayNotificaiton = function displayNotificaiton(_ref6, options) {
  var commit = _ref6.commit,
      select = _ref6.select;
  var max = notificationsData.max;
  var notifications = select.notifications(options);

  if (notifications.length >= max) {
    commit.dismissOldest(options);
  } else {
    commit.processQueue(options);
  }
};