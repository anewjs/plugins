import { PositionReducer, Positions, Section, Position } from 'types/notifications'

export const reducePositions = (positions: Positions, reducer: PositionReducer) => {
    return Object.keys(positions).reduce((positionsObj, vertical) => {
        positionsObj[vertical] = Object.keys(positionsObj[vertical]).reduce(
            (positionVerticalObject, horizontal) => {
                const position = positionVerticalObject[horizontal]

                positionVerticalObject[horizontal] = {
                    ...position,
                    ...reducer({
                        vertical,
                        horizontal,
                        ...position,
                    }),
                }

                return positionVerticalObject
            },
            positions[vertical]
        )

        return positionsObj
    }, positions)
}

export const reduceAtPosition = (
    positions: Positions,
    vertical: Section,
    horizontal: Position,
    reducer: PositionReducer
) => {
    const position = positions[vertical][horizontal]

    return {
        ...positions,
        [vertical]: {
            ...positions[vertical],
            [horizontal]: {
                ...position,
                ...reducer(position),
            },
        },
    }
}
