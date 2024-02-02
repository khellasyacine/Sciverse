import React from "react";

const Error404 = () => {
  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="font-poppins text-5xl font-semibold">404: Page Not Found</h2>
      <p className="font-poppins text-xl font-medium">Can not load a page with this route</p>
    </div>
  );
};

export default Error404;
