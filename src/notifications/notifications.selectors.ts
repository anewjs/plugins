/**
 | ------------------
 | Creator Selectors
 | ------------------
 */

const createPositionSelector = type => ({ get, prop }) => [
    get.positions,
    prop('vertical', 'top'),
    prop('horizontal', 'right'),

    (positions, vertical, horizontal) => {
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
