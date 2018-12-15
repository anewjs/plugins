import { notificationsData } from './notifications.data';
export default function notificationsConfig(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 3 : _ref$max;

  notificationsData.max = max;
}