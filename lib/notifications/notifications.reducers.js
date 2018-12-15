import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { reducePositions, reduceAtPosition } from './notifications.shared';
import * as initialState from './notifications.state';
export var openNotificationsDrawer = function openNotificationsDrawer() {
  return {
    open: true
  };
};
export var closeNotificationsDrawer = function closeNotificationsDrawer() {
  return {
    open: false
  };
};
export var enqueueNotification = function enqueueNotification(_ref2, _ref) {
  var positions = _ref2.positions;

  if (_ref === void 0) {
    _ref = {};
  }

  var _ref3 = _ref,
      vertical = _ref3.vertical,
      horizontal = _ref3.horizontal,
      _ref3$key = _ref3.key,
      key = _ref3$key === void 0 ? new Date().getTime() : _ref3$key,
      _ref3$duration = _ref3.duration,
      duration = _ref3$duration === void 0 ? 3000 : _ref3$duration,
      _ref3$undo = _ref3.undo,
      undo = _ref3$undo === void 0 ? false : _ref3$undo,
      config = _objectWithoutPropertiesLoose(_ref3, ["vertical", "horizontal", "key", "duration", "undo"]);

  return {
    positions: reduceAtPosition(positions, vertical, horizontal, function (_ref4) {
      var queue = _ref4.queue;
      return {
        queue: [].concat(queue, [_extends({
          key: key,
          duration: duration,
          undo: undo
        }, config, {
          open: true
        })])
      };
    })
  };
};
export var processQueue = function processQueue(_ref5, _ref6) {
  var positions = _ref5.positions;
  var vertical = _ref6.vertical,
      horizontal = _ref6.horizontal;
  return {
    positions: reduceAtPosition(positions, vertical, horizontal, function (_ref7) {
      var queue = _ref7.queue,
          notifications = _ref7.notifications;
      return queue.length && {
        queue: queue.slice(1),
        notifications: [].concat(notifications, [queue[0]])
      };
    })
  };
};
export var dismissOldest = function dismissOldest(_ref8, _ref9) {
  var positions = _ref8.positions;
  var vertical = _ref9.vertical,
      horizontal = _ref9.horizontal;
  return {
    positions: reduceAtPosition(positions, vertical, horizontal, function (_ref10) {
      var notifications = _ref10.notifications;
      return {
        notifications: [_extends({}, notifications[0], {
          open: false
        })].concat(notifications.slice(1))
      };
    })
  };
};
export var closeNotifications = function closeNotifications(_ref11) {
  var positions = _ref11.positions;
  return {
    positions: reducePositions(positions, function (_ref12) {
      var notifications = _ref12.notifications;
      return {
        notifications: notifications.map(function (notification) {
          return _extends({}, notification, {
            open: false
          });
        })
      };
    })
  };
};
export var closeNotification = function closeNotification(_ref13, _ref14, reason) {
  var positions = _ref13.positions;
  var key = _ref14.key,
      vertical = _ref14.vertical,
      horizontal = _ref14.horizontal;
  return {
    positions: reduceAtPosition(positions, vertical, horizontal, function (_ref15) {
      var notifications = _ref15.notifications;
      return {
        notifications: notifications.map(function (notification) {
          return notification.key === key ? _extends({}, notification, {
            dismissed: reason !== 'timeout',
            open: false
          }) : notification;
        })
      };
    })
  };
};
export var exitNotification = function exitNotification(_ref16, _ref17) {
  var positions = _ref16.positions,
      history = _ref16.history;
  var key = _ref17.key,
      vertical = _ref17.vertical,
      horizontal = _ref17.horizontal,
      _ref17$historySize = _ref17.historySize,
      historySize = _ref17$historySize === void 0 ? 24 : _ref17$historySize;
  positions = reduceAtPosition(positions, vertical, horizontal, function (_ref18) {
    var notifications = _ref18.notifications;
    return {
      notifications: notifications.filter(function (notification) {
        var isHistory = notification.key === key;

        if (isHistory && !notification.dismissed && notification.duration) {
          history = [].concat(history.slice(0, historySize), [notification]);
        }

        return !isHistory;
      })
    };
  });
  return {
    history: history,
    positions: positions
  };
};
export var dismissNotification = function dismissNotification(_ref19, key) {
  var history = _ref19.history;
  return {
    clearing: history.length === 1 && history.some(function (notification) {
      return notification.key === key;
    }),
    history: history.map(function (notification) {
      return notification.key === key ? _extends({}, notification, {
        destroy: true
      }) : notification;
    })
  };
};
export var dismissNotifications = function dismissNotifications(_ref20, key) {
  var history = _ref20.history;
  return {
    clearing: true,
    history: history.map(function (notification) {
      return _extends({}, notification, {
        destroy: true
      });
    })
  };
};
export var destroyNotification = function destroyNotification(_ref21, key) {
  var history = _ref21.history;
  return {
    clearing: false,
    history: history.filter(function (notification) {
      return notification.key !== key;
    })
  };
};
export var destroyNotifications = function destroyNotifications() {
  return {
    clearing: false,
    history: initialState.history
  };
};