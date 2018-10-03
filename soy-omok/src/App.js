import React, { Component } from "react";
import {
  checkVerticalWinner,
  checkHorizontalWinner,
  checkDescDiagonalWinner,
  checkAsecDiagoWinner
} from "./util/helper";
import logo from "./logo.svg";
import "./App.css";
import pikaStone from "./pika.png";
import jmbStone from "./jmb.png";
import jmbWin from "./jmbWin.png";
import pikaWin from "./pikaWin.png";
//TODO : black -> jmb , white -> pika
const initialState = {
  size: 16,
  borad: Array.from(Array(16), () => Array(16).fill(null)), // 2d array
  selctedRow: null,
  selctedCol: null,
  turn: "black", //blakc first
  jmbWinCount: false,
  pikaWinCount: false,
  reset: true
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.turn !== this.state.turn) this.checkWinner();
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
      reset: false,
      selctedRow: row,
      selctedCol: col,
      borad: changeBoard,
      turn: this.state.turn === "black" ? "white" : "black"
    });
  };
  checkWinner = () => {
    //아마 turn 은 반대로 넣어주어야 겠구나...

    const {
      size,
      turn,
      borad,
      selctedRow,
      selctedCol,
      jmbWinCount,
      pikaWinCount
    } = this.state;
    const prevTurn = turn === "black" ? "white" : "black";
    //console.log("prevTurn  ", prevTurn);
    if (
      checkVerticalWinner(borad, prevTurn, selctedRow, selctedCol, size) ||
      checkHorizontalWinner(borad, prevTurn, selctedRow, selctedCol, size) ||
      checkDescDiagonalWinner(borad, prevTurn, selctedRow, selctedCol, size) ||
      checkAsecDiagoWinner(borad, prevTurn, selctedRow, selctedCol, size)
    ) {
      if (prevTurn === "black") {
        this.setState({
          jmbWinCount: true
        });
      } else if (prevTurn === "white") {
        this.setState({
          pikaWinCount: true
        });
      }
    }
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
          <div className="Omok__Wrapper">
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
                        {this.state.borad[row][col] && !this.state.reset ? (
                          <span
                            className="col__stone"
                            style={{
                              backgroundImage:
                                this.state.borad[row][col] === "black"
                                  ? `url(${jmbStone})`
                                  : `url(${pikaStone})`
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
          <div className="Omok__Score" style={{ marginLeft: "55px" }}>
            <h2>Who won?</h2>
            <table>
              <thead>
                <tr>
                  <th>JMB</th>
                  <th>Pika</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundImage: this.state.jmbWinCount
                        ? `url(${jmbWin})`
                        : null
                    }}
                  />
                  <td
                    style={{
                      backgroundImage: this.state.pikaWinCount
                        ? `url(${pikaWin})`
                        : null
                    }}
                  />
                </tr>
              </tbody>
            </table>
            <button className="btn btn-default">One More Game </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
