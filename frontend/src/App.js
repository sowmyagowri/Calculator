import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import update from 'immutability-helper';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { result: [] }
  }

  calculate = () => {
    console.log(this.state.result);
    axios.post('http://localhost:3001/calculate', this.state.result)
      .then(response => {
        console.log("Response : ", response);
        if(response.status === 200){
          this.setState({
            result: response.data,
          })
        }
    })
      .catch(error => {
        this.setState({
          result: "error"
        })
    })
  }

  handleClick = button => {

    if(button === "="){
        this.calculate()
    }

    else if(button === "C"){
        this.clear()
    }
    else if(button === "CE"){
        this.backspace()
    }

    else {
      const updatedValue = update(this.state.result, {
        $push: [button],
      })
      this.setState({
        result: updatedValue,
      })
    }
};

clear = () => {
  this.setState({
      result: []
  })
};

backspace = () => {
  this.setState({
      result: this.state.result.slice(0, -1)
  })
};

  render() {
    return (

      <div>
        <div className="calculator-body">
          <br/><br/>
          <h1>Calculator App</h1>
          <br/>
            <div className="result">
                <p>{this.state.result}</p>
            </div>
            <div className="button">
                <button name="(" onClick={e => this.handleClick(e.target.name)}>(</button>
                <button name="CE" onClick={e => this.handleClick(e.target.name)}>CE</button>
                <button name=")" onClick={e => this.handleClick(e.target.name)}>)</button>
                <button class="function-keys" name="C" onClick={e => this.handleClick(e.target.name)}>C</button>
                <br/>
                <button name="1" onClick={e => this.handleClick(e.target.name)}>1</button>
                <button name="2" onClick={e => this.handleClick(e.target.name)}>2</button>
                <button name="3" onClick={e => this.handleClick(e.target.name)}>3</button>
                <button class="function-keys" name="+" onClick={e => this.handleClick(e.target.name)}>+</button>
                <br/>
                <button name="4" onClick={e => this.handleClick(e.target.name)}>4</button>
                <button name="5" onClick={e => this.handleClick(e.target.name)}>5</button>
                <button name="6" onClick={e => this.handleClick(e.target.name)}>6</button>
                <button class="function-keys" name="-" onClick={e => this.handleClick(e.target.name)}>-</button>
                <br/>
                <button name="7" onClick={e => this.handleClick(e.target.name)}>7</button>
                <button name="8" onClick={e => this.handleClick(e.target.name)}>8</button>
                <button name="9" onClick={e => this.handleClick(e.target.name)}>9</button>
                <button class="function-keys" name="*" onClick={e => this.handleClick(e.target.name)}>x</button>
                <br/>
                <button name="." onClick={e => this.handleClick(e.target.name)}>.</button>
                <button name="0" onClick={e => this.handleClick(e.target.name)}>0</button>
                <button name="=" onClick={e => this.handleClick(e.target.name)}>=</button>
                <button class="function-keys" name="/" onClick={e => this.handleClick(e.target.name)}>÷</button>
                <br/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
