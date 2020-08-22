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
    this.searchEmployee(this.state.search);
  };

 

 

  render() {
  //  result.filter(i => {

  //  }
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
              <th>First Name</th>
              <th scope="col">Last Name </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>

           
            {this.state.result.filter((employee) => {
              if(!this.state.search) return true;
              if(employee.firstName.includes(this.state.search)) {return true}
              return false;
            })
            .map(employee => (
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