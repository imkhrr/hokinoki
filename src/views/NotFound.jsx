import React, { Component } from "react";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="animate__animated animate__fadeIn"
      >
        <div>
          <div>
            <p className="bold t0 is-red">404</p>
            <span className="bold">Not Found</span>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
