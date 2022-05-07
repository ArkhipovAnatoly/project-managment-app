import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        {/* сюда подставится дочерний роут с path=”/” или “/about” */}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
