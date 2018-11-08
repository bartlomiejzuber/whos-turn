import React, { Component } from "react";
import Header from "./Components/Header/Header";
import Description from "./Components/Description/Description";
import PlayerList from "./Components/PlayerList/PlayerList";
import Player from "./Components/Player/Player";
import Timer from "./Components/Timer/Timer";
import TurnNumber from "./Components/TurnNumber/TurnNumber";

import "./App.scss";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { HotKeys } from "react-hotkeys";

momentDurationFormatSetup(moment);
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const keyMap = {
  space: { sequence: "space", action: "keyup" }
};

class App extends Component {
  state = {
    start: false,
    players: [],
    index: 0,
    turn: 0,
    avgTurnsTimes: []
  };
  onStartPlay = players => {
    if (players.length > 0) {
      this.setState({ start: true, players, index: 0, turnStart: moment() });
      shuffle(players);
    }
  };

  hotkeyHandlers = {
    space: event => {
      if (this.state.start) {
        const avgTurnTime = this.state.avgTurnsTimes.find(
          x => x.index === this.state.index
        );
        let calculatedAvg = [];
        if (avgTurnTime) {
          avgTurnTime.times.push({
            start: this.state.turnStart,
            end: moment()
          });

          avgTurnTime.avg = moment.duration(
            avgTurnTime.times
              .map(x => x.end.diff(x.start))
              .map(x => moment.duration(x).asMilliseconds())
              .reduce((acc, curr) => (acc += curr), 0) /
              avgTurnTime.times.length
          );
          calculatedAvg = [...this.state.avgTurnsTimes];
        } else {
          calculatedAvg = [
            {
              index: this.state.index,
              times: [{ start: this.state.turnStart, end: moment() }]
            }
          ];
        }

        this.setState({
          ...this.state,
          turnStart: moment(),
          avgTurnsTimes: calculatedAvg,
          index:
            this.state.index + 1 >= this.state.players.length
              ? 0
              : this.state.index + 1,
          turn:
            this.state.index + 1 >= this.state.players.length
              ? this.state.turn + 1
              : this.state.turn
        });
      }
    }
  };

  render() {
    return (
      <HotKeys keyMap={keyMap} handlers={this.hotkeyHandlers}>
        <div className="App">
          <div className="main-section">
            <Header start={this.state.start}/>
            {!this.state.start && (
              <>
                <Description>
                <PlayerList onStartPlay={this.onStartPlay} />
                </Description>
              </>
            )}
          </div>
          {this.state.start && (
            <div className="current-palayer-section">
              <Player {...this.state} />
              <Timer
                start={this.state.turnStart}
                avgTurnTimes={this.state.avgTurnsTimes.find(
                  x => x.index === this.state.index
                )}
              />

              <TurnNumber turn={this.state.turn} />
            </div>
          )}
        </div>
      </HotKeys>
    );
  }
}

export default App;
