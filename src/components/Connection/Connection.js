import React from "react";

const Connection = props => {
  const info = props.info.connection;
  const date = props.info.date;

  if (JSON.stringify(info) !== "[]") {
    return (
      <tr>
        <td>{date}</td>
        <td>{info.transport ? info.transport : "-"}</td>
        <td>{info.segments[0].departure ? info.segments[0].departure : "-"}</td>
        <td>{info.segments[0].arrival ? info.segments[0].arrival : "-"}</td>
        <td>{info.duration ? info.duration : "-"}</td>
        <td>{info.price ? info.price : "-"}</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{date}</td>
        <td colSpan="5">No available connections found this day</td>
      </tr>
    );
  }
};

export default Connection;
