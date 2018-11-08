import React from "react";

class TurnNumber extends React.Component {
  render() {
    const { turn } = this.props;

    return <div className="turn" >Turn: {turn}</div>;
  }
}

export default TurnNumber;