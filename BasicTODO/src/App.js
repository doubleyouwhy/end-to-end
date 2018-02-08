import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { elements: [] }
  }

  add = () => {
    var username = this.username
    fetch('/addTodo', {
      method: 'POST',
      body: JSON.stringify({ username: username, item: this.inp.value })
    })
      .then(x => x.json())
      .then(y => this.setState(st => { return { elements: y } })
      )
    this.inp.value = ''
  }

  clear = () => {
    this.setState({ elements: [] })
    this.inp.value = ''
    fetch('/clearTodo', {
      method: 'POST',
      body: JSON.stringify(this.username)
    }
    )
  }

  componentDidMount() {
    this.username = window.prompt("Please enter your username")
    fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(this.username)
    })
      .then(x => x.json())
      .then(y => this.setState({ elements: y }))
  }

  render() {
    return (
      <div className="App">
        <input ref={r => this.inp = r}></input>
        <button onClick={this.add}>add it</button>
        <button onClick={this.clear}>clear</button>
        {this.state.elements.map(x => (<h3> {x} </h3>))}
      </div>
    );
  }
}

export default App;
