import { reducePositions } from './notifications.shared'

export const persist = {
    rehydrate: store => {
        const { positions } = store.get()

        return {
            open: false,
            clearing: false,
            positions: reducePositions(positions, ({ notifications }) => ({
                notifications: notifications.filter(notification => notification.open),
            })),
        }
    },
}
