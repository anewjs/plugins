import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION } from './notifications.constants'
import { notificationsData } from './notifications.data'

export const destroyNotification = ({ commit }, key) => {
    commit.dismissNotification(key)

    setTimeout(() => {
        commit.destroyNotification(key)
    }, 340)
}

export const destroyNotifications = ({ commit }) => {
    commit.dismissNotifications()

    setTimeout(() => {
        commit.destroyNotifications()
    }, 340)
}

export const sendNotification = (
    { commit, dispatch, core, get },
    {
        // Arguments
        solo = false,

        // Props
        onDismiss,
        onTimeout,
        onAction,

        // Options
        vertical = 'top',
        horizontal = 'right',
        ...options
    }
) => {
    const key = new Date().getTime()
    const isMobile = core.get.app.isMobile()
    const open = get.open()

    options.key = key
    options.vertical = vertical
    options.horizontal = isMobile ? 'center' : horizontal

    notificationsData[key] = {
        onAction,
        onDismiss,
        onTimeout,
    }

    if (solo) {
        commit.closeNotifications()
    }

    if (open) {
        commit.addNotification(options)
    } else {
        commit.enqueueNotification(options)
        dispatch.displayNotificaiton(options)
    }
}

export const exitNotification = ({ commit, dispatch }, options) => {
    const displayDelay = TRANSITION_DELAY + TRANSITION_DOWN_DURATION + 40

    commit.exitNotification(options)

    setTimeout(() => {
        dispatch.displayNotificaiton(options)
    }, displayDelay)
}

export const displayNotificaiton = ({ commit, select }, options) => {
    const { max } = notificationsData
    const notifications = select.notifications(options)

    if (notifications.length >= max) {
        commit.dismissOldest(options)
    } else {
        commit.processQueue(options)
    }
}
