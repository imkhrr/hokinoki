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
        className="animate__animated animate__fadeIn animate__fast"
      >
        <div>
          <a href="/">
            <p className="bold t0 is-red" style={{ cursor: "pointer" }}>
              404
            </p>
          </a>
          <span className="bold">Not Found</span>
        </div>
      </div>
    );
  }
}

export default NotFound;
