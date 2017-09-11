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
    // Add all of the total questions to an array
    const totalQuestionAnswers = [
      ...questions[0].inputs,
      ...questions[1].inputs,
      ...questions[2].inputs,
      ...questions[3].inputs,
      ...questions[4].inputs,
      ...questions[5].inputs,
    ];
    // Keep track of all of the results in an array
    let results = [];
    // Reformat the results array to include the title
    let endResults = [];
    let groups = [];
    let count = 0;

    // Need to do a while loop to loop through the total quesiton answers supplied and make
    // sure we grab the right ones from the number selected
    do {
      count++;
      for (let i = 0; i < totalQuestionAnswers.length; i++) {
        if (count % selectedNumber === 0 && (i + 1) % selectedNumber === 0) {
          // Need to keep track of the groups and make sure the same one from the same group is not selected
          if (!groups.includes(totalQuestionAnswers[i].group)) {
            results.push(totalQuestionAnswers[i]);
            groups.push(totalQuestionAnswers[i].group);
            break;
          }
        }
      }
    } while (results.length < 6);

    endResults = map(questions, q => {
      let finalResult = {};
      forEach(results, r => {
        if (r.group === q._id) {
          finalResult = {
            ...r,
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
