import React, { Component } from "react";
import axios from "axios";
import Header from "./containers/Layout/Header/Header";
import Search from "./components/Search/Search";
import Connections from "./containers/Connections/Connections";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: [],
      startDate: "",
      dates: [],
      requestStatus: false,
      requestsAllowed: true
    };
    this.searchConnections = this.searchConnections.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleDatesRange = this.handleDatesRange.bind(this);
  }

  formatDate = date => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
  };

  handleDatesRange = (startDate, numberOfDays) => {
    let dates = [];
    for (let inx = 0; inx < numberOfDays; inx++) {
      let newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + inx);
      dates.push(this.formatDate(newDate));
    }
    this.setState({
      dates: dates
    });
  };

  searchConnections = async event => {
    event.preventDefault();
    if (this.state.startDate !== "") {
      if (this.state.requestStatus === false) {
        this.setState({
          requestStatus: true,
          requestsAllowed: true
        });
        this.handleDatesRange(this.state.startDate, 7);
        let connections = [];
        await this.delay();
        for (let i = 0; i < this.state.dates.length; i++) {
          await axios
            .get(
              `${"https://cors-anywhere.herokuapp.com/"}https://www.virail.com/virail/v7/search/en_us?from=c.3173435&to=c.3169070&lang=en_us&dt=${
                this.state.dates[i]
              }&currency=USD&adult_passengers=1`
            )
            .then(response => {
              if (response.data.result.length > 0 && response.data.result) {
                let connection = {
                  date: this.state.dates[i],
                  connection: this.handleFilter(response.data.result)
                };
                connections.push(connection);
              } else {
                let connection = {
                  date: this.state.dates[i],
                  connection: []
                };
                connections.push(connection);
              }
            })
            .catch(error => {
              if (error.response.status === 429) {
                this.setState({
                  requestsAllowed: false
                });
              } else {
                this.setState({
                  requestsAllowed: true
                });
              }
            });
        }
        this.setState({
          connections: connections,
          requestStatus: false
        });
      } else {
        console.log("Please wait for previous request response...");
      }
    } else {
      console.log("Please pick the date first...");
    }
  };

  delay = () => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(200);
      }, 3000);
    });
  };

  handleFilter = connections => {
    let result = {};
    if (connections.length > 0) {
      connections.reduce(function(prev, current) {
        return prev.priceVal < current.priceVal
          ? (result = prev)
          : (result = current);
      });
    }
    return result;
  };

  handleSetStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Search
            searchConnections={this.searchConnections}
            onChange={this.onChange}
            handleFilter={this.handleFilter}
            handleSetStartDate={this.handleSetStartDate}
            startDate={this.state.startDate}
          />
          <Connections
            connections={this.state.connections}
            searchStatus={this.state.requestStatus}
            requestsAllowed={this.state.requestsAllowed}
          />
        </div>
      </div>
    );
  }
}

export default App;
