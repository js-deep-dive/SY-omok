import React, { Component } from "react";
import { checkVerticalWinner } from "./util/helper";
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
  componentDidUpdate() {
    if (this.checkWinner()) console.log("winnner");
  }
  handleClick = (row, col) => {
    console.log("selected", row, col);
    let changeBoard = this.state.borad;
    //alreay fill, return;
    if (changeBoard[row][col]) {
      return;
    }
    changeBoard[row][col] = this.state.turn;

    this.setState({
      selctedRow: row,
      selctedCol: col,
      borad: changeBoard,
      turn: this.state.turn === "black" ? "white" : "black"
    });
  };
  checkWinner = () => {
    //아마 turn 은 반대로 넣어주어야 겠구나...

    const { size, turn, borad, selctedRow, selctedCol } = this.state;
    const prevTurn = turn === "black" ? "white" : "black";
    console.log("prevTurn  ", prevTurn);
    if (checkVerticalWinner(borad, prevTurn, selctedRow, selctedCol, size))
      return true;
    else return false;
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
                      {this.state.borad[row][col] ? (
                        <span
                          className="col__stone"
                          style={{
                            backgroundColor:
                              this.state.borad[row][col] === "black"
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
