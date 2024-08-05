import React from "react";
import Header from "./layout/Header";

function Reports() {
  return (
    <div className="web">
      <Header />

      {/* <div className="row m-auto mt-2">
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>MIS Report > Category</div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row m-auto mt-3">
        {/* <div className="col-md-3">
          <a href="/report/catagory">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Category</div>
              </div>
            </div>
          </a>
        </div> */}
        <div className="col-md-3 mb-4">
          <a href="/report/dsr">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">DSR</div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3  mb-4">
          <a href="/report/enquiry">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Enquiry Report</div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3  mb-4">
          <a href="/report/survey">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Survey</div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3  mb-4">
          <a href="/report/quotation">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Quotation</div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3  mb-4">
          <a href="/report/runningprojects">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Running Projects</div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3  mb-4">
          <a href="/report/enquiry">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Closed Projects</div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3  mb-4">
          <a href="/report/payment">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Payment Report</div>
              </div>
            </div>
          </a>
        </div>
        {/* <div className="col-md-3  mb-4">
          <a href="/report/onecommunity">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">1 Community</div>
              </div>
            </div>
          </a>
        </div> */}
        <div className="col-md-3  mb-4">
          <a href="/report/b2b">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">B2B</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Reports;
