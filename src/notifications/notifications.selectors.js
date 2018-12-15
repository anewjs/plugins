/**
 | ------------------
 | Creator Selectors
 | ------------------
 */

const createPositionSelector = type => store => [
    store.get.positions,
    args => args[0],
    (positions, { vertical = 'top', horizontal = 'right' } = {}) => {
        return positions[vertical][horizontal][type]
    },
]

/**
 | ------------------
 | Selects
 | ------------------
 */

export const queue = createPositionSelector('queue')

export const notifications = createPositionSelector('notifications')
