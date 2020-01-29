/**
 | ------------------
 | Notifications Data
 | ------------------
 | Shared variable between Notifications
 | Store and Component
 |
 */

export const notificationsData = {}

export const getNotification = key => {
    const notification = { ...notificationsData[key] }
    delete notificationsData[key]
    return notification
}
