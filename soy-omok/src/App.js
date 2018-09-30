import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 16,
      borad: Array.from(Array(16), () => Array(16).fill(null)), // 2d array
      selctedRow: null, // 필요 없을 수도 ?
      selctedCol: null,
      turn: "black" //blakc first
    };
  }
  handleClick = (row, col) => {
    console.log("selected", row, col);
    let changeBoard = this.state.borad;
    console.log(this.state);
    changeBoard[row][col] = this.state.turn;

    this.setState({
      selctedRow: row,
      selctedCol: col,
      borad: changeBoard,
      turn: this.state.turn === "black" ? "white" : "black"
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">Soyoung's first react project</p>

        <div className="Omok">
          {/* generate an array of numbers  */}
          {Array.from(Array(this.state.size), (_, x) => x).map(row => {
            return (
              <div className="row">
                {Array.from(Array(this.state.size), (_, y) => y).map(col => {
                  return (
                    <div
                      className="col"
                      onClick={() => {
                        this.handleClick(row, col);
                      }}
                    >
                      {console.log("color", this.state.turn)}
                      {this.state.borad[row][col] ? (
                        <span
                          className="col__stone"
                          style={{
                            backgroundColor:
                              this.state.turn === "black"
                                ? "#000000"
                                : "#ffffff"
                          }}
                        />
                      ) : null}
                    </div>
                  );
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
