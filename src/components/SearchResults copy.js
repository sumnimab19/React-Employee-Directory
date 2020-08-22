import React, { Component } from "react";
import SearchBox from "./SearchBox.js";
import EmployeeList from "./EmployeeList.js";
import API from "../utils/API";



class SearchResults extends Component {
  state = {
    result: [],
    search: ""

  };

  
  componentDidMount() {
    this.searchEmployee();
  }

  searchEmployee = () => {
    API.search()
      .then(res => {
     
        this.setState({
          result: res.data.results.map((employee, empID) => ({
            firstName: employee.name.first,
            lastName: employee.name.last,
            picture: employee.picture.large,
            email: employee.email,
            phone: employee.phone,
            key: empID
          }))

        })
      
      })
      .catch(err => console.log(err));
  }



 handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
  
    
    this.setState({

      [name]: value

    });
        
  };
  
 

  handleFormSubmit = event => {
    event.preventDefault();
    this.employeeSort();
  };

//   employeeSort(){
//   this.state.result.sort(function(a, b) {
//     var textA = a.firstName.toUpperCase();
//     var textB = b.firstName.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

// });
// }

  employeeSort(){
    this.state.result.sort((a, b) => a.firstname.localeCompare(b.firstname))
  }

 

  render() {
    console.log(this.state.result);
    const filteredEmployee = this.state.result.filter((employee) => {
      if(employee.firstName.toLowerCase().includes(this.state.search.toLowerCase()))
      {
        return true;
      }
        return false;
    })


    return (
      <div className="container">
        
        <div className="row">
          <div className="col-md-6">
            <SearchBox
              search={this.state.search}
               handleInputChange={this.handleInputChange}
               handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>

        <div className="row">
          <table className="table">
            <tr>
              <th scope="col">Photo</th>
              <th
                style = {{cursor:"pointer"}}
                onClick={this.employeeSort}
              >
                First Name
              </th>
              <th scope="col">Last Name </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>

           
           
            {filteredEmployee.map(employee => (
              <EmployeeList
                picture={employee.picture}
                firstName={employee.firstName}
                lastName={employee.lastName}
                email={employee.email}
                phone={employee.phone}
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