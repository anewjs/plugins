import { isValidElement } from 'react'
import { serialize } from 'react-serialize'
import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION } from './notifications.constants'
import { notificationsData } from './notifications.data'

/**
 * Used as a utility to destory notification. Users should use
 * the `exitNotification` action to remove a notification
 */
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

/**
 * Addes notification to the queue then runs the processQueue
 */
export const sendNotification = (
    { commit, dispatch, core, get },
    {
        // Arguments
        solo = false,

        // Props
        onDismiss,
        onTimeout,
        action,

        // Alias
        y = 'top',
        x = 'right',

        // Options
        vertical = y,
        horizontal = x,
        ...options
    }
) => {
    const key = new Date().getTime()
    const isMobile = core.get.app.isMobile()
    const open = get.open()

    options.key = key
    options.vertical = vertical
    options.horizontal = isMobile ? 'center' : horizontal

    if (isValidElement(options.message)) {
        options.message = serialize(options.message)
    }

    notificationsData[key] = {
        onDismiss,
        onTimeout,
        action,
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

/**
 * Removes from notifications and runs the processQueue
 * @param {Object} options notificaiton infromation { key, horizontal, vertical }
 */
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
