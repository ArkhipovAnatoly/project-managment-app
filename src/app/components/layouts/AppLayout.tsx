import { Outlet } from 'react-router-dom';
import Footer from '../share/Footer/Footer';

const AppLayout = () => {
  return (
    <>
      <Outlet />
      {/* сюда подставится дочерний роут с path=”/” или “/about” */}
    </>
  );
};

export default AppLayout;
