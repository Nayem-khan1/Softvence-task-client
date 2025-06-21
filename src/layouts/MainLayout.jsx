import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="">
      {/* <Sidebar /> */}
      <div className="">
        {/* <Navbar /> */}
        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;