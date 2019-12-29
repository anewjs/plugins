import { Data } from 'types/notifications'
import { notificationsData } from './notifications.data'

export default function notificationsConfig({ max = 3 }: Data = {}) {
    notificationsData.max = max
}
