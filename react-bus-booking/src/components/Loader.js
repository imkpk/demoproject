import React from "react";

function Loader() {
  return (
    <div className="loader my-5">
      <div className="d-flex justify-content-center">
        <div className="spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
