import { reducePositions, reduceAtPosition } from './notifications.shared'
import * as initialState from './notifications.state'

export const openNotificationsDrawer = () => ({
    open: true,
})

export const closeNotificationsDrawer = () => ({
    open: false,
})

export const enqueueNotification = (
    { positions },
    {
        // Alias
        timeout = 3000,

        // Config
        vertical,
        horizontal,
        key = new Date().getTime(),
        duration = timeout,
        undo = false,
        ...config
    } = {}
) => ({
    positions: reduceAtPosition(positions, vertical, horizontal, ({ queue }) => ({
        queue: [
            ...queue,
            {
                key,
                duration,
                undo,
                ...config,
                open: true,
            },
        ],
    })),
})

export const processQueue = ({ positions }, { vertical, horizontal }) => ({
    positions: reduceAtPosition(
        positions,
        vertical,
        horizontal,
        ({ queue, notifications }) =>
            queue.length && {
                queue: queue.slice(1),
                notifications: [...notifications, queue[0]],
            }
    ),
})

export const dismissOldest = ({ positions }, { vertical, horizontal }) => ({
    positions: reduceAtPosition(positions, vertical, horizontal, ({ notifications }) => ({
        notifications: [{ ...notifications[0], open: false }, ...notifications.slice(1)],
    })),
})

export const closeNotifications = ({ positions }) => ({
    positions: reducePositions(positions, ({ notifications }) => ({
        notifications: notifications.map(notification => ({
            ...notification,
            open: false,
        })),
    })),
})

export const closeNotification = ({ positions }, { key, vertical, horizontal }, reason) => ({
    positions: reduceAtPosition(positions, vertical, horizontal, ({ notifications }) => ({
        notifications: notifications.map(notification =>
            notification.key === key
                ? {
                      ...notification,
                      dismissed: reason !== 'timeout',
                      open: false,
                  }
                : notification
        ),
    })),
})

export const exitNotification = (
    { positions, history },
    { key, vertical, horizontal, historySize = 24 }
) => {
    positions = reduceAtPosition(positions, vertical, horizontal, ({ notifications }) => ({
        notifications: notifications.filter(notification => {
            const isHistory = notification.key === key

            if (isHistory && !notification.dismissed && notification.duration) {
                history = [notification, ...history.slice(0, historySize)]
            }

            return !isHistory
        }),
    }))

    return {
        history,
        positions,
    }
}

export const dismissNotification = ({ history }, key) => ({
    history: history.map(notification =>
        notification.key === key ? { ...notification, destroy: true } : notification
    ),
})

export const dismissNotifications = ({ history }, key) => ({
    history: history.map(notification => ({
        ...notification,
        destroy: true,
    })),
})

export const destroyNotification = ({ history }, key) => ({
    history: history.filter(notification => notification.key !== key),
})

export const destroyNotifications = () => ({
    history: initialState.history,
})

export const addNotification = ({ history }, notification) => ({
    history: [notification, ...history],
})
