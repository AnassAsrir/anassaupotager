import React from "react";
import "../styles/Components.css";

export class Section extends React.Component {
  render() {
    return (
      <section className={`section ${this.props.className || ""}`}>
        {this.props.children}
      </section>
    );
  }
}
