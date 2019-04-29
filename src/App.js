import React, { Component } from 'react';
import './App.css';

import DigitGrid from './components/DigitGrid/DigitGrid';
import OperatorsGrid from './components/OperatorsGrid/OperatorsGrid';
import quotes from './helperBin/motivation';
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
    this.motivateHandler = this.motivateHandler.bind(this);
  }

  clearHandler() {
    this.setState({
      display: '0',
      isDecimal: false,
      isOperator: false
    });
  }

  mathHandler() {
    let lastItem = this.state.display[this.state.display.length - 1];
    if (lastItem === '+' || lastItem === '-' || lastItem === '*' || lastItem === '/') {
      let newDisplay = this.state.display.split('');
      let usableDisplay = newDisplay.splice(0, newDisplay.length - 1).join('');
      let total = safeEval(usableDisplay);
      this.setState({
        isDecimal: false,
        isOperator: false,
        display: total
      });
    }
    else {
      let total = safeEval(this.state.display);
      this.setState({
        isDecimal: false,
        isOperator: false,
        display: total
      });
    }
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

  motivateHandler() {
    let newQuote = quotes[Math.floor(Math.random() * 20)].quote;
    this.setState({
      display: newQuote,
      isDecimal: false,
      isOperator: false
    });
  }

  render() {
    return (
      <div className="App">
        <div className="headerContainer">
        <img src="https://i.ibb.co/mchrNYL/45-Q58-PIC16bj-G40-Rptbcr-PIC2018.png" width="50px" height="50px" alt="logo" />
        <h5>Beaufort Tek</h5>
        <div className="solarContainer">
          <div className="solar"></div>
          <div className="solar"></div>
          <div className="solar"></div>
          <div className="solar"></div>
        </div>
        <h3>BOW-84 Plus</h3>
        </div>

        <Display display={this.state.display}/>
        <div className="buttonsContainer">
          <DigitGrid id="digits" click={this.inputHandler}/>
          <OperatorsGrid id="operators" click={this.inputHandler}/>
          <button className="equals button" onClick={this.mathHandler} id="equals">=</button>
          <button className="clear button" onClick={this.clearHandler} id="clear">AC</button>
          <button className="button motivate" id="motivated" onClick={this.motivateHandler}><span role="img" aria-label="motivate quote">💪🏻</span></button>
        </div>
      </div>
    );
  }
}

export default App;
