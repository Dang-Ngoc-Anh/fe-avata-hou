import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../../../pages/Sidebar";
function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="containerLayout" style={{ display: "flex" }}>
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default DefaultLayout;
