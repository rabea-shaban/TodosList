import { Outlet } from "react-router";
import Navbar from "../components/Navbar.tsx";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />

      <div className="container py-5 px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
