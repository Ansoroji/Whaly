import {
  Outlet,
} from "react-router-dom";

import Navbar
  from "../components/Navbar/Navbar";


function AppLayout() {
  return (
    <>
      <header className="whaly-site-header">
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}


export default AppLayout;
