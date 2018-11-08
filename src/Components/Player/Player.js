import React from "react";

class PlayerStateCarousel extends React.Component {
  render() {
    const { players, index } = this.props;

    return <div className="player-name">{players[index]}</div>;
  }
}

export default PlayerStateCarousel;
