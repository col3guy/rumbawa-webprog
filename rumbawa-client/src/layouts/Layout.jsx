import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const Layout = () => {
  const user = getUser();

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <NavBar />

      <main className="pb-16 pt-20">
        <Outlet />
      </main>

      {/* Optional: hide footer for logged-in dashboard users later */}
      <Footer />
    </div>
  );
};

export default Layout;