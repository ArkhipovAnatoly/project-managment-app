import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './app/components/layouts/AppLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Error from './pages/Error/Error';
import SignIn from './pages/SingIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import MainPage from './pages/MainPage/MainPage';
import { userAuthSlice } from './app/store/reducers/UserAuthSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';

function App() {
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    token && dispatch(setUserAuthData({ token }));
    userId && dispatch(setUserAuthData({ userId }));
  }, [dispatch, setUserAuthData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
