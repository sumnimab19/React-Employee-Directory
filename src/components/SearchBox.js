import React from "react";
import "../styles/SearchBox.css";

function SearchBox(props) {
  return (
    <form>
      <div className="form-group">
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="search"
          placeholder="Search Employee"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3 searchbtn">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBox;