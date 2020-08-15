import React from "react";
import "./style.css";
// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div>
        <h1>Employee Directory</h1>
        <p>Click on corrots to filter by heading or use the search box to narrow your search</p>
      </div>
    </nav>

  );
}

export default Navbar;
