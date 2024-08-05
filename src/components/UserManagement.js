import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import axios from "axios";

function UserManagement() {
  const [userdata, setuserdata] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    getcustomers();
  }, []);

  const getcustomers = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getcustomer");
    if ((res.status = 200)) {
      setuserdata(res.data?.customers.filter((i)=>i.type === "userapp"));
      setSearchResults(res.data?.customers.filter((i)=>i.type === "userapp"));
    }
  };

  const deleteuser = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/deletetercustomer/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };
  console.log(userdata);
  // Pagination logic
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const pageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };
  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="m-auto" style={{ marginLeft: "-32px" }}>
          <div>
            <h3>User App Customers</h3>
            <div className="pagination mt-4">
              <span>Page </span>
              <select
                className="m-1"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
              >
                {pageOptions.map((page) => (
                  <option value={page} key={page}>
                    {page}
                  </option>
                ))}
              </select>
              <span> of {totalPages}</span>
            </div>
            <table class="table table-hover table-bordered mt-2">
              <thead className="text-align-center">
                <tr className="table-secondary ">
                  <th className="table-head" scope="col">
                    S.No
                  </th>
                  <th className="table-head" scope="col">
                    User Name
                  </th>
                  <th className="table-head" scope="col">
                    User Email
                  </th>

                  <th className="table-head" scope="col">
                    User Contact No.
                  </th>
                  <th className="table-head" scope="col">
                    Password
                  </th>

                  <th className="table-head" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="justify-content-center">
                {currentItems.map((item, index) => (
                  <tr className="user-tbale-body text-center">
                    <td>{index + 1}</td>
                    <td>{item.customerName}</td>
                    <td>{item.email}</td>
                    <td>{item.mainContact}</td>
                    <td>{item.password}</td>

                    <td>
                      <Button
                        className="m-1 row"
                      
                        onClick={() => deleteuser(item._id)}
                      >
                        Delete
                      </Button>{" "}
                      {/* <Button className="m-1 row" variant="danger">
                        Block
                      </Button>{" "} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
