import React from "react";
import logo from "../../assets/loader.gif";

const Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="loading..." />
    </div>
  );
};

export default Loader;
