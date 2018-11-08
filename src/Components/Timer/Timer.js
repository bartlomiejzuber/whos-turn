import React from "react";
import moment from "moment";

class Timer extends React.Component {
  componentDidMount = () => {
    this.intervalHandler = setInterval(() => this.setState({}), 15);
  };

  componentWillReceiveProps = newProps => {
    if (this.props.start !== newProps.start) {
      clearInterval(this.intervalHandler);
      this.intervalHandler = setInterval(() => this.setState({}), 15);
    }
  };

  render() {
    const { start, avgTurnTimes } = this.props;
    return (
      <>
        <header className="time">
          {moment.duration(moment().diff(start)).format("mm:ss", {
            trim: false
          })}
        </header>
        {avgTurnTimes &&
          avgTurnTimes.avg && (
            <header className="avg-time">
              Avg turn time:
              {avgTurnTimes.avg.format("mm:ss", {
                trim: false
              })}
            </header>
          )}
      </>
    );
  }
}

export default Timer;
