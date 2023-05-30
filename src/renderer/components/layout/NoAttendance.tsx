import React from "react";

const NoAttendance = () => {
  return (
    <div className="no-attendance">
      <p>No Records Found</p>
      <img
        className="no-results-found-icon"
        src="./images/no-results.png"
        alt="No-results-Found"
      />
    </div>
  );
};

export default NoAttendance;
