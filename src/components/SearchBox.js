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
        
      </div>
    </form>
  );
}

export default SearchBox;