import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/layouts/AppLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Error from './pages/Error/Error';
import SingUp from './pages/SingUp/SingUp';
import LogIn from './pages/LogIn/LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="logIn" element={<LogIn />} />
          <Route path="singUp" element={<SingUp />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
