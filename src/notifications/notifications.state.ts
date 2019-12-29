import { Notification, Positions } from 'types/notifications'

export const open: boolean = false

export const history: Notification[] = []

export const positions: Positions = {
    top: {
        left: {
            notifications: [],
            queue: [],
        },
        center: {
            notifications: [],
            queue: [],
        },
        right: {
            notifications: [],
            queue: [],
        },
    },
    bottom: {
        left: {
            notifications: [],
            queue: [],
        },
        center: {
            notifications: [],
            queue: [],
        },
        right: {
            notifications: [],
            queue: [],
        },
    },
}
