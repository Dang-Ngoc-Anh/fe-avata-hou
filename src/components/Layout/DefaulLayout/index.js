import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../../../pages/Sidebar";
import './Container_Layout.scss'
function DefaultLayout({ children }) {
  return (
    <div>
      {/* <Header /> */}
      <div className="containerLayout">
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default DefaultLayout;
