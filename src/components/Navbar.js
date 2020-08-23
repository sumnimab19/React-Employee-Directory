import React from "react";
import "../styles/Navbar.css";


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div>
        <h1>Employee Directory</h1>
        <p>Click on corrots to sort by 'First Name' or use the search box to narrow your search</p>
      </div>
    </nav>

  );
}

export default Navbar;
