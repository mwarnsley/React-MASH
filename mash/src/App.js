import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {map, isEmpty, forEach} from 'lodash';

import Header from './components/Header';
import ListContainer from './components/ListContainer';
import Button from './components/Button';
import Results from './components/Results';
import {switchQuestionState, setInputValue, setSelectNumber, calculateResults} from './actions/mainActions';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectValue: '',
      selectError: {},
    };

    this.nextList = this.nextList.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }
  inputChange(e) {
    const {dispatch} = this.props;
    const inputValues = {
      value: e.target.value,
      inputID: Number(e.target.dataset.id),
    };
    dispatch(setInputValue(inputValues));
  }
  selectChange(e) {
    const {dispatch} = this.props;
    const numberSelected = Number(e.target.value);
    if (numberSelected) {
      this.setState({
        selectError: {},
        selectValue: numberSelected,
      });
      dispatch(setSelectNumber(numberSelected));
    }
  }
  calculateFinalResults() {
    const {questions, selectedNumber} = this.props;
    // Put all of the individual question answers as an array
    const fQuestion = map(questions[0].inputs, f => f.value);
    const sQuestion = map(questions[1].inputs, s => s.value);
    const tQuestion = map(questions[2].inputs, t => t.value);
    const foQuestion = map(questions[3].inputs, fo => fo.value);
    const fiQuestion = map(questions[4].inputs, fi => fi.value);
    const siQuestion = map(questions[5].inputs, si => si.value);
    // Make an array of arrays from all of the individual question answers
    const totalQuestionAnswers = [fQuestion, sQuestion, tQuestion, foQuestion, fiQuestion, siQuestion];
    // Reformat the results array to include the title
    let endResults = [];
    // returning the results by looping through the total questions array and returning the mash function
    const results = totalQuestionAnswers.map(function(questions, index) {
      return mash(questions, index);
    });
    // looping through the qestions and return the findmultiple function that grabs the correct item condencing it
    function mash(questions, groupIndex) {
      const q = questions.map(function(g, i) {
        return findMultiple(groupIndex, i);
      });

      let lowestIndex = 0;
      for (let i = 1; i < q.length; i++) {
        if (q[i] < q[lowestIndex]) {
          lowestIndex = i;
        }
      }

      return questions[lowestIndex];
    }
    // Looping through and getting the difference between the rows and grabbing the correct group item
    function findMultiple(groupIndex, index) {
      let x = 4 * groupIndex + index + 1; //4 = number of questions  per group
      while (x % selectedNumber !== 0 && x <= 140) {
        //140 = rows X cols (5 x 28)
        x += 28; //28 = the difference between rows for 7 groups
      }
      return x;
    }
    // Format the end results with a value and title as an object
    endResults = map(questions, q => {
      let finalResult = {};
      forEach(results, (r, i) => {
        if (i === q._id - 1) {
          finalResult = {
            value: r,
            title: q.title,
          };
        }
      });
      return finalResult;
    });

    return endResults;
  }
  nextList() {
    const {dispatch, questionState} = this.props;
    const enterResults = this.calculateFinalResults();
    if (questionState === 'Number' && !this.state.selectValue) {
      this.setState({
        selectError: {
          error: true,
          errorMessage: 'Please Select a Number From Above',
        },
      });
      return;
    } else if (questionState === 'Number' && this.state.selectValue) {
      dispatch(calculateResults(enterResults));
      dispatch(switchQuestionState());
      return;
    }
    dispatch(switchQuestionState());
  }
  renderListContainer() {
    const {questions, questionState, selectOptions, results} = this.props;
    let listContainer = '';
    switch (questionState) {
      case 'Crushes':
        listContainer = <ListContainer question={questions[0]} onChange={this.inputChange} />;
        break;
      case 'Careers':
        listContainer = <ListContainer question={questions[1]} onChange={this.inputChange} />;
        break;
      case 'Pets':
        listContainer = <ListContainer question={questions[2]} onChange={this.inputChange} />;
        break;
      case 'Vehicles':
        listContainer = <ListContainer question={questions[3]} onChange={this.inputChange} />;
        break;
      case 'Kids':
        listContainer = <ListContainer question={questions[4]} onChange={this.inputChange} />;
        break;
      case 'Honeymoon':
        listContainer = <ListContainer question={questions[5]} onChange={this.inputChange} />;
        break;
      case 'Number':
        listContainer = (
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Please Select a Number</ControlLabel>
            <FormControl componentClass="select" placeholder="SELECT" onChange={this.selectChange}>
              <option value="">select</option>
              {map(selectOptions, (s, i) => {
                return (
                  <option key={i} value={s}>
                    {s}
                  </option>
                );
              })}
            </FormControl>
            <p className="select-error">
              {!isEmpty(this.state.selectError) ? this.state.selectError.errorMessage : null}
            </p>
          </FormGroup>
        );
        break;
      case 'Results':
        listContainer = <Results results={results} />;
        break;
      default:
        listContainer = <ListContainer question={questions[0]} onChange={this.inputChange} />;
    }
    return listContainer;
  }
  render() {
    const {storedQuestionState, questionState} = this.props;
    const btnText = storedQuestionState[storedQuestionState.length - 2] === questionState ? 'Results' : 'Next';
    const appContainerClass = questionState === 'Results' ? 'result-list-container' : 'app-list-container';
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className={appContainerClass}>{this.renderListContainer()}</div>
        <div className="btn-container">
          {questionState !== 'Results' ? (
            <Button
              btnText={btnText}
              type="button"
              onClick={this.nextList}
              classes="btn btn-default btn-warning btn-next"
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  questions: state.main.questions,
  questionState: state.main.questionState,
  storedQuestionState: state.main.storedQuestionState,
  selectOptions: state.main.selectOptions,
  selectedNumber: state.main.selectedNumber,
  results: state.main.results,
}))(App);
