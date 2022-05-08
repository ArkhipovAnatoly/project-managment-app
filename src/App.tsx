import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './app/components/layouts/AppLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Error from './pages/Error/Error';
import SignIn from './pages/SingIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
