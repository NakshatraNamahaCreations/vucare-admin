import React, { useState, PureComponent, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Chart from "react-apexcharts";

import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(3, 177, 98)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Dashboard() {
  const { light } = useContext(CreateToggle);

  const [userdata, setuserdata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);
  const [paymentdata, setpaymentdata] = useState([]);
  const [displayedRows, setDisplayedRows] = useState(5);

  const showAllRows = () => {
    setDisplayedRows(paymentdata?.length);
  };
  const showFewerRows = () => {
    setDisplayedRows(5);
  };

  useEffect(() => {
    getappcustomer();
    getservicemanagement();
    getapppauyments();
  }, []);

  const getappcustomer = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/userapp/getuser"
    );
    if ((res.status = 200)) {
      setuserdata(res.data?.userdata);
    }
  };

  const getapppauyments = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/payment/service/paywithuserdata"
    );
    if ((res.status = 200)) {
      setpaymentdata(res.data?.userdata);
    }
  };

  const totalAmount = paymentdata.reduce(
    (total, item) => total + item.data.amount,
    0
  );
  const formattedAmt = totalAmount / 100;

  const getservicemanagement = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/userapp/getservices"
    );
    if ((res.status = 200)) {
      setServicedata(res.data?.service);
    }
  };

  const formatdate = (fdate) => {
    const date = new Date(fdate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const [state, setState] = useState({
    options: {
      colors: ["rgb(176, 39, 39)", "#fff"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
      },
    },
    series: [
      {
        name: 'Payment Counts',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const dateCounts = {};

    // Count payments for each date
    paymentdata.forEach((payment) => {
      const createdAt = new Date(payment.createdAt);
      const month = createdAt.getMonth();
      dateCounts[month] = (dateCounts[month] || 0) + 1;
    });

    // Extract the counts for each month
    const counts = Array.from({ length: 12 }, (_, month) => dateCounts[month] || 0);

    // Update the state with the new data
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: counts,
        },
      ],
    }));
  }, [paymentdata]);

  return (
    <div className={light ? "row black container_box" : "row "}>
      <div className="col-md-2 ">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row ">
          <div className="col-6">
            <div className="row m-auto  mt-3">
              <div className="col-md-6 ">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="rupee.png" width="50px" />
                    <div className="home-content">Earnings</div>
                    <div className="home-desc"><i class="fa-solid fa-indian-rupee-sign"></i>  {formattedAmt}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="service.png" width="50px" />
                    <div className="home-content">Services</div>
                    <div className="home-desc">{Servicedata?.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row m-auto  mt-3">
              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="rating.png" width="50px" />

                    <div className="home-content">Customer</div>
                    <div className="home-desc">{userdata?.length}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="vendor.png" width="50px" />

                    <div className="home-content">Vendor</div>
                    <div className="home-desc">07</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div style={{ textAlign: "center" }}>
              <h3>Payment Reports</h3>
            </div>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div>
          <div style={{}}>
            <h3>Recent Transctions List</h3>
          </div>
          {displayedRows < paymentdata.length ? (
            <div>
              <button
                onClick={showAllRows}
                style={{
                  float: "right",
                  background: "darkred",
                  color: "white",
                }}
              >
                Show All
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={showFewerRows}
                style={{
                  float: "right",
                  background: "green",
                  color: "white",
                }}
              >
                Show less
              </button>
            </div>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transcation ID</StyledTableCell>
                  <StyledTableCell align="right">Customer Name</StyledTableCell>
                  <StyledTableCell align="right">
                    Customer Number
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Customer Email
                  </StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentdata.slice(0, displayedRows).map((i) => (
                  <StyledTableRow key={i.data?.transactionId}>
                    <StyledTableCell component="th" scope="row">
                      {i.data?.transactionId}
                    </StyledTableCell>
                    <StyledTableCell align="right">{i?.userdata[0]?.customerName}</StyledTableCell>
                    <StyledTableCell align="right">
                      {i?.userdata[0]?.mainContact}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {i?.userdata[0]?.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatdate(i.createdAt)}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {i.data?.amount / 100}
                    </StyledTableCell>
                    <StyledTableCell align="right">Paid</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
