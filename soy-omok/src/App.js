import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 16,
      borad: Array(16 * 16).fill(null) // create 16 by 16 board.
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">Soyoung's first react project</p>

        <div className="Omok">
          {Array(this.state.size)
            .fill(null)
            .map(row => {
              return (
                <div className="row">
                  {Array(this.state.size)
                    .fill(null)
                    .map(col => {
                      return <div className="col" />;
                    })}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
