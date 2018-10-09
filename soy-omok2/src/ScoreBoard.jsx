import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import jmbWin from "./jmbWin.png"
import pikaWin from "./pikaWin.png"
class ScoreBoard extends PureComponent {
  static propTypes = {
    user1: PropTypes.string.isRequired,
    user2: PropTypes.string.isRequired,
    user1Win: PropTypes.bool,
    user2Win: PropTypes.bool
  }
  static defaultProps = {
    user1: "USER1",
    user2: "USER2"
  }
  render() {
    return (
      <div className="Omok__Score" style={{ marginLeft: "55px" }}>
        <h2>Who won?</h2>
        <table>
          <thead>
            <tr>
              <th>{this.props.user1}</th>
              <th>{this.props.user2}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  backgroundImage: this.props.user1Win ? `url(${jmbWin})` : null
                }}
              />
              <td
                style={{
                  backgroundImage: this.props.user2Win
                    ? `url(${pikaWin})`
                    : null
                }}
              />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
export default ScoreBoard
