import React from "react";

function DataLoading({ children }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col justify-center items-center">
      <div className="loading"></div>
      {children}
    </div>
  );
}

export default React.memo(DataLoading);
