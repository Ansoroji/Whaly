import {
  Outlet,
} from "react-router-dom";

import Footer
  from "../components/Footer/Footer";


function PublicLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}


export default PublicLayout;
