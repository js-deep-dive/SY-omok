import React, { Component } from "react"
import {
  checkVerticalWinner,
  checkHorizontalWinner,
  checkDescDiagonalWinner,
  checkAsecDiagoWinner
} from "./util/helper"
import logo from "./logo.svg"
import "./App.css"
import pikaStone from "./pika.png"
import jmbStone from "./jmb.png"

import ScoreBoard from "./ScoreBoard"

//TODO : black -> jmb , white -> pika
const initialState = {
  size: 16,
  borad: Array.from(Array(16), () => Array(16).fill(null)), // 2d array
  selctedRow: null,
  selctedCol: null,
  turn: "black", //blakc first
  jmbWinCount: false,
  pikaWinCount: false,
  reset: true,

  //second hw
  //선택된 row, col을 저장해서 하나씩 빼면서 지워주기.. pop pop pop
  logSelectedRow: [],
  logSelectedCol: [],

  deleteRow: null, // 어디를 지워야 할지 숫자 저장
  deleteCol: null, // 어디를 지워야 할지 숫자 저장
  user1: "",
  user2: "",
  //pass name for scoreboard
  passUserName1: "",
  passUserName2: "",
  sendUsrInfo: false
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.turn !== this.state.turn) this.checkWinner()
  }
  handleClick = (row, col) => {
    //TODO : change Immutability
    if (!this.state.sendUsrInfo) {
      return
    }
    console.log("selected", row, col)
    let changeBoard = this.state.borad
    //alreay fill, return;
    if (changeBoard[row][col]) {
      return
    }
    //this.setState({ myArray: [...this.state.myArray, 'new value'] })
    changeBoard[row][col] = this.state.turn

    this.setState(prevState => {
      return {
        reset: false,
        selctedRow: row,
        selctedCol: col,
        borad: changeBoard,
        logSelectedRow: [...prevState.logSelectedRow, row],
        logSelectedCol: [...prevState.logSelectedCol, col],
        turn: prevState.turn === "black" ? "white" : "black"
      }
    })
  }
  handlChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  resetOneStage = () => {
    //TODO : change Immutability
    if (this.state.logSelectedRow.length === 0) {
      return
    }
    let array = [...this.state.borad] // make a separate copy of the array
    const RowIndex = this.state.logSelectedRow[
      this.state.logSelectedRow.length - 1
    ]
    const ColIndex = this.state.logSelectedCol[
      this.state.logSelectedCol.length - 1
    ]
    console.log(
      "this.state.logSelectedRow.length ",
      this.state.logSelectedRow.length
    )

    //array.splice(index, 1)
    array[RowIndex][ColIndex] = null
    this.setState(prevState => {
      return {
        deleteRow: RowIndex,
        deleteCol: ColIndex,
        borad: array,
        logSelectedRow: [
          // remove last index from logSelectedX array
          ...prevState.logSelectedRow.splice(
            0,
            prevState.logSelectedRow.length - 1
          )
        ],
        logSelectedCol: [
          // remove last index from logSelectedY array
          ...prevState.logSelectedCol.splice(
            0,
            prevState.logSelectedCol.length - 1
          )
        ]
      }
    })
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        passUserName1: prevState.user1,
        passUserName2: prevState.user2,
        user1: "",
        user2: "",
        sendUsrInfo: true
      }
    })
  }
  checkWinner = () => {
    //아마 turn 은 반대로 넣어주어야 겠구나...
    const { size, turn, borad, selctedRow, selctedCol } = this.state
    const prevTurn = turn === "black" ? "white" : "black"
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
        })
      } else if (prevTurn === "white") {
        this.setState({
          pikaWinCount: true
        })
      }
    }
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
                          this.handleClick(row, col)
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
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div style={{ marginLeft: "100px" }}>
            <div className="Omok__input__user">
              <h2>Enter User Info</h2>
              <form className="input-group" onSubmit={this.onFormSubmit}>
                {/* TODO : boooool check... submit*/}
                <div className="Omok__input__Wrapper">
                  <div>
                    <input
                      className="form-control"
                      name="user1"
                      value={this.state.user1}
                      onChange={this.handlChange}
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      name="user2"
                      value={this.state.user2}
                      onChange={this.handlChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </form>
            </div>
            <div className="Omok__Score">
              {/* require : Name of user1, user2 And submit complete.... */}
              {this.state.passUserName1 &&
              this.state.passUserName2 &&
              this.state.sendUsrInfo ? (
                <ScoreBoard
                  user1={this.state.passUserName1}
                  user2={this.state.passUserName2}
                  user1Win={this.state.jmbWinCount}
                  user2Win={this.state.pikaWinCount}
                />
              ) : null}
            </div>
            <button className="btn btn-default" onClick={this.resetOneStage}>
              Reset One Stage
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default App
