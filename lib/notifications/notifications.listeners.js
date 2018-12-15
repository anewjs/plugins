import { reducePositions } from './notifications.shared';
export var persist = {
  rehydrate: function rehydrate() {
    return function (_ref) {
      var positions = _ref.positions;
      return {
        open: false,
        clearing: false,
        positions: reducePositions(positions, function (_ref2) {
          var notifications = _ref2.notifications;
          return {
            notifications: notifications.filter(function (notification) {
              return notification.open;
            })
          };
        })
      };
    };
  }
};