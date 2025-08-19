import React from "react";
import "../styles/Components.css";

export class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>{this.props.title}</h1>
        {this.props.subtitle && <p>{this.props.subtitle}</p>}
      </header>
    );
  }
}
