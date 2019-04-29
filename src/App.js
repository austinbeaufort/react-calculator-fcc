import React, { Component } from 'react';
import './App.css';

import DigitGrid from './components/DigitGrid/DigitGrid';
import OperatorsGrid from './components/OperatorsGrid/OperatorsGrid';
import Display from './components/Display/Display';

import safeEval from 'safe-eval';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0'
    }

    this.clearHandler = this.clearHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.mathHandler = this.mathHandler.bind(this);
  }

  clearHandler() {
    this.setState({
      display: '0',
      isDecimal: false,
      isOperator: false
    });
  }

  mathHandler() {
    let total = safeEval(this.state.display);
    this.setState({
      display: total
    });
  }

  inputHandler(e) {
    let newValue = e.target.textContent;
    if (this.state.display === '0') {
      this.setState({
        display: newValue
      });
    }
    else {
      if (this.state.isDecimal && newValue === '.') {
        return;
      }
      if (this.state.isOperator && (newValue === '+' || newValue === '-' || newValue === '*' || newValue === '/')) {
        this.setState(prevState => {
          let oldValue = prevState.display[prevState.display.length - 1];
          return {
            display: prevState.display.replace(oldValue, newValue)
          }
        })
      }
      else {
        this.setState(prevState => {
          if (newValue === '.') {
            return {
              isDecimal: true,
              isOperator: false,
              display: prevState.display += newValue
            }
          }
          else if (newValue === '+' || newValue === '-' || newValue === '*' || newValue === '/') {
            return {
              isDecimal: false,
              isOperator: true,
              display: prevState.display += newValue
            }
          }
          else {
            return {
              isOperator: false,
              display: prevState.display += newValue
            }
          }
        })
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Display display={this.state.display}/>
        <DigitGrid id="digits" click={this.inputHandler}/>
        <OperatorsGrid id="operators" click={this.inputHandler}/>
        <button onClick={this.mathHandler} id="equals">=</button>
        <button onClick={this.clearHandler} id="clear">AC</button>
      </div>
    );
  }
}

export default App;
