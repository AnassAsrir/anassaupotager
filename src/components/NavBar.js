import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components.css";

export class NavBar extends React.Component {
  render() {
    const links = this.props.links || [];
    return (
      <nav className="nav-bar">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }
}
