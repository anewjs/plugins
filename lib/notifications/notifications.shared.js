export const reducePositions = (positions, reducer) => {
  return Object.keys(positions).reduce((positionsObj, vertical) => {
    positionsObj[vertical] = Object.keys(positionsObj[vertical]).reduce((positionVerticalObject, horizontal) => {
      const position = positionVerticalObject[horizontal];
      positionVerticalObject[horizontal] = { ...position,
        ...reducer({
          vertical,
          horizontal,
          ...position
        })
      };
      return positionVerticalObject;
    }, positions[vertical]);
    return positionsObj;
  }, positions);
};
export const reduceAtPosition = (positions, vertical, horizontal, reducer) => {
  const position = positions[vertical][horizontal];
  return { ...positions,
    [vertical]: { ...positions[vertical],
      [horizontal]: { ...position,
        ...reducer(position)
      }
    }
  };
};