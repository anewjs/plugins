import { notificationsData } from './notifications.data';
export default function notificationsConfig({
  max = 3
} = {}) {
  notificationsData.max = max;
}