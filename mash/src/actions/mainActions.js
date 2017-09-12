// Action that switches the question state
export function switchQuestionState() {
  return {
    type: 'SWITCH_QUESTION_STATE',
  };
}

// Action that sets the input value for the fields
export function setInputValue(value) {
  return {
    type: 'SET_INPUT_VALUE',
    payload: value,
  };
}

// Action that sets and stores the number selected in the select
export function setSelectNumber(number) {
  return {
    type: 'SET_SELECT_NUMBER',
    payload: number,
  };
}

// Action that calculates the end of the MASH
export function calculateResults(results) {
  return {
    type: 'CALCULATE_RESULTS',
    payload: results,
  };
}

// Action to restart the game settings
export function restartGame() {
  return {
    type: 'RESTART_GAME',
  };
}
