import React from "react";

class PlayerList extends React.Component {
  state = {
    players: [],
    playerName: ""
  };

  addNewPlayer = () => {
    if (this.state.playerName)
      this.setState({
        players: [...this.state.players, this.state.playerName],
        playerName: ""
      });
  };

  handleNewPlayerNameChange = e => {
    this.setState({ ...this.state, playerName: e.target.value });
  };

  removePlayer = index => {
    this.setState({
      players: this.state.players.splice(index, 1),
      ...this.state
    });
  };

  handleEnterKeyPress = e => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      //Enter keycode
      this.addNewPlayer();
    }
  };

  startPlay = () => {
    this.props.onStartPlay(this.state.players);
  };

  render() {
    return (
      <div className="player-list">
        {this.state.players.map((player, i) => (
          <div className="player-list--name" key={`${player}_${i}`}>
            <label>{player}</label>
            <button onClick={() => this.removePlayer(i)}>x</button>
          </div>
        ))}
        <div className="add-new-player">
          <label id="player-name" className="player-name-label">
            Player name
          </label>
          <input
            id="player-name"
            value={this.state.playerName}
            onChange={this.handleNewPlayerNameChange}
            onKeyPress={this.handleEnterKeyPress}
            type="text"
            className="player-name"
          />
          <button onClick={this.addNewPlayer}>+</button>
        </div>

        <div className="start-section">
            <button className="start-btn" onClick={this.startPlay}>Start</button>
        </div>
      </div>
    );
  }
}

export default PlayerList;
