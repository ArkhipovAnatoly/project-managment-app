import { Outlet } from 'react-router-dom';
import Footer from '../share/Footer/Footer';

const AppLayout = () => {
  return (
    <>
      <main>
        <Outlet />
        {/* сюда подставится дочерний роут с path=”/” или “/about” */}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
