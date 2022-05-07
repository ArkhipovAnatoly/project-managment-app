import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/homePage';
import BoardsPage from './pages/BoardsPage/BoardsPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BoardsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
