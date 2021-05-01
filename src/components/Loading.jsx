import React from "react";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width="197px"
        height="197px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx={50} cy={23} r={13} fill="#747474">
          <animate
            attributeName="cy"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
            keyTimes="0;0.5;1"
            values="23;77;23"
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loading;
