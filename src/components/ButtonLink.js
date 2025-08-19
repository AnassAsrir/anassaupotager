import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components.css";

export class ButtonLink extends React.Component {
  render() {
    return (
      <Link to={this.props.to}>
        <button className="button-link">{this.props.children}</button>
      </Link>
    );
  }
}
