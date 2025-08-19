import React from "react";

export default function EventBadge({ action }) {
  const className = `event-badge ${action.replace(" ", "-").toLowerCase()}`;
  return <span className={className}>{action}</span>;
}
