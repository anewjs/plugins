import { reducePositions } from './notifications.shared';
export var persist = {
  rehydrate: function rehydrate(store) {
    var _store$get = store.get(),
        positions = _store$get.positions;

    return {
      open: false,
      clearing: false,
      positions: reducePositions(positions, function (_ref) {
        var notifications = _ref.notifications;
        return {
          notifications: notifications.filter(function (notification) {
            return notification.open;
          })
        };
      })
    };
  }
};