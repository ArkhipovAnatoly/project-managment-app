import { Outlet } from 'react-router-dom';
import Footer from '../share/Footer/Footer';

const AppLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
