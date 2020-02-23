import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search = props => {
  return (
    <div className="search-box row justify-content-center">
      <div className="card card-sm">
        <h4>Pick the date below:</h4>
        <div className="card-body row no-gutters align-items-center">
          <div className="col-auto">
            <i className="fas fa-search h4 text-body"></i>
          </div>
          <div className="col">
            <DatePicker
              className="form-control form-control-lg form-control-borderless"
              selected={props.startDate}
              onChange={date => props.handleSetStartDate(date)}
              minDate={new Date()}
              showDisabledMonthNavigation
              dateFormatCalendar={"MMM yyyy"}
            />
          </div>
          <div className="col-auto">
            <button
              className="btn-danger btn btn-lg"
              onClick={props.searchConnections}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
