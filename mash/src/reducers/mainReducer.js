import initialState from './initialState';
import {map} from 'lodash';

// Creating the Main Reducer
export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_QUESTION_STATE':
      const nextQState = state.storedQuestionState[state.questionStateIndex++];
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
    case 'RESTART_GAME':
      return {
        storedQuestionState: ['Crushes', 'Careers', 'Pets', 'Vehicles', 'Kids', 'Honeymoon', 'Number', 'Results'],
        questionState: 'Crushes',
        questionStateIndex: 1,
        questions: [
          {
            _id: 1,
            title: 'Crushes',
            inputs: [
              {
                id: 1,
                group: 1,
                value: '',
              },
              {
                id: 2,
                group: 1,
                value: '',
              },
              {
                id: 3,
                group: 1,
                value: '',
              },
              {
                id: 4,
                group: 1,
                value: '',
              },
            ],
          },
          {
            _id: 2,
            title: 'Careers',
            inputs: [
              {
                id: 1,
                group: 2,
                value: '',
              },
              {
                id: 2,
                group: 2,
                value: '',
              },
              {
                id: 3,
                group: 2,
                value: '',
              },
              {
                id: 4,
                group: 2,
                value: '',
              },
            ],
          },
          {
            _id: 3,
            title: 'Pets',
            inputs: [
              {
                id: 1,
                group: 3,
                value: '',
              },
              {
                id: 2,
                group: 3,
                value: '',
              },
              {
                id: 3,
                group: 3,
                value: '',
              },
              {
                id: 4,
                group: 3,
                value: '',
              },
            ],
          },
          {
            _id: 4,
            title: 'Vehicles',
            inputs: [
              {
                id: 1,
                group: 4,
                value: '',
              },
              {
                id: 2,
                group: 4,
                value: '',
              },
              {
                id: 3,
                group: 4,
                value: '',
              },
              {
                id: 4,
                group: 4,
                value: '',
              },
            ],
          },
          {
            _id: 5,
            title: 'Kids',
            inputs: [
              {
                id: 1,
                group: 5,
                value: '',
              },
              {
                id: 2,
                group: 5,
                value: '',
              },
              {
                id: 3,
                group: 5,
                value: '',
              },
              {
                id: 4,
                group: 5,
                value: '',
              },
            ],
          },
          {
            _id: 6,
            title: 'Honeymoon',
            inputs: [
              {
                id: 1,
                group: 6,
                value: '',
              },
              {
                id: 2,
                group: 6,
                value: '',
              },
              {
                id: 3,
                group: 6,
                value: '',
              },
              {
                id: 4,
                group: 6,
                value: '',
              },
            ],
          },
        ],
        selectOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        selectedNumber: 1,
        results: [],
      };
    default:
      return state;
  }
}
