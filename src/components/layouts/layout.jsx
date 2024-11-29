import * as React from "react";

// import { Head } from '../seo';

export const Layout = ({ children }) => {
  return (
    <>
      {/* <Head title={title} /> */}
      <div className="containter">{children}</div>
    </>
  );
};
