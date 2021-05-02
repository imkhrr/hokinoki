import React from "react";
import { Loader } from "rsuite";

function Loading(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader backdrop size="lg" content="Loading..." vertical />
    </div>
  );
}

export default Loading;
