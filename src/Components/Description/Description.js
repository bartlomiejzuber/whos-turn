import React from "react";

const Description = props => (
  <section className="description">
    <div>
      Are you playing some board game and everybody is still asking{" "}
      <i>"who's turn?"</i>
    </div>
    <div className="use-it">This simple app was made for you</div>
    {props.children}
  </section>
);

export default Description;
