export function combineApplyChanges(...applyFunctions) {
  return (state, change) => applyFunctions.reduce((nextState, apply) => apply(nextState, change), state);
}

export function applyLoginInput(state, change) {
  return {
    ...state,
    ...change,
  };
}
