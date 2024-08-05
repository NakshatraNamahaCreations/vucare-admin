import React from "react";
import Sidenav from "./Sidenav";
import Header from "./Header";

function Review() {
  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row mt-3 justify-content-center">
          <div
            className="col-md-10 shadow p-3 mb-5 bg-white rounded"
            style={{ marginLeft: "-50px" }}
          >
            <h5>Review Status</h5>

            <div className="d-flex pt-3">
              <div className="d-border">
                <span>
                  <i
                    class="fa-solid fa-calendar mx-2"
                    style={{ color: "rgb(120 119 119 / 60%)" }}
                  ></i>
                </span>
                Last 7days
              </div>
              <div className="d-border mx-3">Today</div>
            </div>

            <div className="review-row mt-3">
              Your Review Performance is{" "}
              <span style={{ color: "green" }}>Good</span>
            </div>

            <div className="row mt-3 m-auto" style={{ gap: "10px" }}>
              <div
                className="col-md-4 p-3"
                style={{ backgroundColor: "#8080800f", borderRadius: "3px" }}
              >
                <div className="text-center" style={{ fontWeight: "bold" }}>
                  <span>
                    <i
                      class="fa-solid fa-thumbs-up mx-2"
                      style={{ color: "gold" }}
                    ></i>
                  </span>
                  Positive Review
                </div>
                <div className="text-center" style={{ fontSize: "36px" }}>
                  371
                </div>
                <div className="text-center">
                  <span style={{ color: "green" }}>
                    <i class="fa-solid fa-arrow-up mx-2"></i>
                  </span>
                  <span style={{ color: "green" }}>12%</span>
                  <span className="mx-1"></span>from last 7 days
                </div>
              </div>

              <div
                className="col-md-4 p-3"
                style={{ backgroundColor: "#8080800f", borderRadius: "3px" }}
              >
                <div className="text-center" style={{ fontWeight: "bold" }}>
                  <span>
                    <i
                      class="fa-solid fa-thumbs-down mx-2"
                      style={{ color: "gold" }}
                    ></i>
                  </span>
                  Negative Review 
                </div>
                <div className="text-center" style={{ fontSize: "36px" }}>
                  200
                </div>
                <div className="text-center">
                  <span style={{ color: "green" }}>
                    <i class="fa-solid fa-arrow-up mx-2"></i>
                  </span>
                  <span style={{ color: "red" }}>3%</span>
                  <span className="mx-1"></span>from last 7 days
                </div>
              </div>
            </div>

            <div className="row pt-3">
              <h5>Latest Review</h5>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <h6 className="pt-2">I use it everybody</h6>
                    <p>
                      I have been only using this for a short time, but I really
                      love it so far! it's not that it's 100% perfect
                    </p>
                    <div>
                      by BU Sri . <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
