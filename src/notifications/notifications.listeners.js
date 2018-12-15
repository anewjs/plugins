import { reducePositions } from './notifications.shared'

export const persist = {
    rehydrate: () => ({ positions }) => ({
        open: false,
        clearing: false,
        positions: reducePositions(positions, ({ notifications }) => ({
            notifications: notifications.filter(notification => notification.open),
        })),
    }),
}
