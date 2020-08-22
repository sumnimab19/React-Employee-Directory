import React, { Component } from "react";
import SearchBox from "./SearchBox.js";
import EmployeeList from "./EmployeeList.js";
import API from "../utils/API";



class SearchResults extends Component {

    state = {
      originalResults: [],
      displayResults: []
    };
  
    componentDidMount() {
      API.search().then(results => {
        const searchResult = results.data.results.map((res, i) => ({
          image: res.picture.large,
          firstName: res.name.first,
          lastName: res.name.last,
          phone: res.phone,
          email: res.email,
          dob: res.dob.date,
          key: i
        }));
  
        this.setState({ originalResults: searchResult, displayResults: searchResult });
      });
    }
  
    filterResults = (query, results) => {
      return results.filter(employee => {
        const lastName = employee.lastName.toLowerCase();
        const firstName = employee.firstName.toLowerCase();
        const fullName = firstName + " " + lastName;
  
        return fullName.includes(query);
      });
    };
  
    

    sortResults = event => {
      this.setState(prevState => {
        const { displayResults, sortOrder } = prevState;
  
        if (sortOrder === "descending") {
          displayResults.sort((a, b) => {
            if (a.firstName > b.firstName) {
              return -1;
            }
            return a.firstName > b.firstName ? 1 : 0;
          });
        } else {
          displayResults.sort((a, b) => {
            if (a.firstName < b.firstName) {
              return -1;
            }
            return a.firstName > b.firstName ? 1 : 0;
          });
        }
  
        return {
          displayResults,
          sortOrder: sortOrder === "descending" ? "ascending" : "descending"
        };
      });
    };
  
    
    

    handleInputChange = e => {
      const query = e.target.value;
  
      this.setState(prevState => ({
        displayResults:
          query.length > 0
            ? this.filterResults(query, prevState.originalResults)
            : prevState.originalResults
      }));
    };

  
  
    render() {
      return (
        <div className="container">
          
          <div className="row">
          <div className="col-md-6">
            <SearchBox
              search={this.state.search}
               handleInputChange={this.handleInputChange}
               
            />
          </div>
        </div>

          <div className="row">
            <table className="table">
                <tr>
                  <th scope ="col">Photo</th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={this.sortResults}
                    id="name"
                  >
                    First Name
                  </th>
                  <th>Last Name</th>
                  <th id="phone">Email</th>
                  <th id="email">Phone</th>
                  <th id="dob">DOB</th>
                </tr>
                {this.state.displayResults.map(employee => (
                  <EmployeeList
                    picture={employee.image}
                    firstName={employee.firstName}
                    lastName={employee.lastName}
                    email={employee.email}
                    phone={employee.phone}
                    dob={employee.dob}
                    key={employee.key}
                  />
                ))}
            </table>
          </div>
        </div>
      );
    }
  }
  
export default SearchResults;