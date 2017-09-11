import initialState from './initialState';
import {map} from 'lodash';

// Setting the index to keep track of the question state to use
let questionStateIndex = 1;

// Creating the Main Reducer
export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_QUESTION_STATE':
      const nextQState = state.storedQuestionState[questionStateIndex++];
      return {
        ...state,
        questionState: nextQState,
      };
    case 'SET_INPUT_VALUE':
      const inputValues = action.payload;
      const newQuestionState = map(state.questions, q => {
        if (q.title === state.questionState) {
          return {
            ...q,
            inputs: map(q.inputs, i => {
              if (i.id === inputValues.inputID) {
                return {
                  ...i,
                  value: inputValues.value,
                };
              }
              return i;
            }),
          };
        }
        return q;
      });
      return {
        ...state,
        questions: newQuestionState,
      };
    case 'SET_SELECT_NUMBER':
      const numberSelected = action.payload;
      return {
        ...state,
        selectedNumber: numberSelected,
      };
    case 'CALCULATE_RESULTS':
      const endResults = action.payload;
      return {
        ...state,
        results: endResults,
      };
    default:
      return state;
  }
}
