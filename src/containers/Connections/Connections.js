import React from "react";
import Connection from "../../components/Connection/Connection";

const Connections = props => {
  // console.log(props.connections);
  return (
    <div>
      <h1>Connections</h1>
      <div className="table-responsive-md">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Transport</th>
              <th scope="col">Departure</th>
              <th scope="col">Arrival</th>
              <th scope="col">Duration</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {props.searchStatus === false ? (
              props.connections.map(connection => (
                <Connection key={connection.connection.id} info={connection} />
              ))
            ) : (
              <tr
                style={{
                  textAlign: "center"
                }}
              >
                <td colSpan="6">
                  {" Please wait a few seconds. Searching..."}
                </td>
              </tr>
            )}
            {props.requestsAllowed === false ? (
              <tr
                style={{
                  textAlign: "center"
                }}
              >
                <td colSpan="6">
                  {"Sorry! Too many requests to the API. Try again later"}
                </td>
              </tr>
            ) : (
              true
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Connections;
