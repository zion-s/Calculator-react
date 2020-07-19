import React, { Component } from 'react';
import './style.css';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      currentValue: null,
      display: '0',
      operandPending: false,
      operator: null
    };
  }

  handleDigits(digit) {
    if (this.state.operandPending) {
      this.setState({
        display: String(digit),
        operandPending: false
      });
    } else {
      this.setState({
        display: this.state.display === '0' ? String(digit) : this.state.display + digit
      });
    }
  }

  handleDot() {
    const display = this.state.display;
    if (this.state.operandPending) {
      this.setState({
        display: '.',
        operandPending: false
      });
    } else if (display.indexOf('.') === -1) {
      this.setState({
        display: this.state.display + '.',
        operandPending: false
      });
    }
  }

  handleClearDisplay() {
    this.setState({
      currentValue: null,
      display: '0',
      operandPending: false,
      operator: null
    });
  }

  handleSign() {
    this.setState({
      display: this.state.display.charAt(0) === '-' ? this.state.display.substr(1) : '-' + this.state.display
    });
  }

  handlePercentage() {
    const value = parseFloat(this.state.display);
    this.setState({
      display: String(value / 100)
    });
  }

  handleOperation(nextOperator) {
    const display = this.state.display;
    const operator = this.state.operator;
    const value = this.state.currentValue;
    const input = parseFloat(display);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    }
    
    if (value === null) {
      this.setState({
        currentValue: input
      });
      console.log(input);
    } else if (operator) {
      const currentValue = value || 0;
      const result = operations[operator](currentValue, input);

      this.setState({
        currentValue: result,
        display: String(result)
      });
    }

    this.setState({
      operandPending: true,
      operator: nextOperator
    })
  }

  handleDelete() {
    const display = this.state.display;
    if (display !== '0' && display.length > 1) {
      this.setState({
        display: display.substring(0, display.length - 1)
      });
    } else if (display.length === 1) {
      this.setState({
        display: '0'
      });
    }
  }

  handleSqrt() {
    const num = parseFloat(this.state.display);
    this.setState({
      display: Math.sqrt(num)
    })
  }

  handleExpon() {
    const num = parseFloat(this.state.display);
    this.setState({
      display: Math.pow(num, 2)
    })
  }

  handleFraction() {
    const num = parseFloat(this.state.display);
    this.setState({
      display: 1/num
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="keys">
            <div className="display">{parseFloat(this.state.display).toLocaleString()}</div>
            <a href="#" className="btn btn-default" onClick={() => this.handlePercentage()}>%</a>
            <a href="#" className="btn btn-default" onClick={() => this.handleSqrt()}>&radic;</a>
            <a href="#" className="btn btn-default" onClick={() => this.handleExpon()}><em>x</em><sup>2</sup></a>
            <a href="#" className="btn btn-default" onClick={() => this.handleFraction()}>1&frasl;<em>x</em></a>
            <a href="#" className="btn btn-default">CE</a>
            <a href="#" className="btn btn-default clear" onClick={() => this.handleClearDisplay()}>C</a>
            <a href="#" className="btn btn-default" onClick={() => this.handleDelete()}>DEL</a>
            <a href="#" className="btn btn-default operator" onClick={() => this.handleOperation('/')}>÷</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(7)}>7</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(8)}>8</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(9)}>9</a>
            <a href="#" className="btn btn-default operator" onClick={() => this.handleOperation('*')}>×</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(4)}>4</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(5)}>5</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(6)}>6</a>
            <a href="#" className="btn btn-default operator" onClick={() => this.handleOperation('-')}>-</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(3)}>3</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(2)}>2</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(1)}>1</a>
            <a href="#" className="btn btn-default operator" onClick={() => this.handleOperation('+')}>+</a>
            <a href="#" className="btn btn-default" onClick={() => this.handleSign()}>&plusmn;</a>
            <a href="#" className="btn btn-default digit" onClick={() => this.handleDigits(0)}>0</a>
            <a href="#" className="btn btn-default decimal" onClick={() => this.handleDot()}><b>.</b></a>
            <a href="#" className="btn btn-default equals" onClick={() => this.handleOperation('=')}>=</a>
          </div>
        </div>
      </div>
    );
  }
}