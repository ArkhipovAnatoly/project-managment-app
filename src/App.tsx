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
import BoardsPage from './pages/BoardsPage/BoardsPage';
import { useTranslation } from 'react-i18next';

function App() {
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const lng = localStorage.getItem('i18nextLng');
    if (lng === 'En' || lng === 'Ru') {
      i18n.changeLanguage(lng);
    }

    token && dispatch(setUserAuthData({ token }));
    userId && dispatch(setUserAuthData({ userId }));
  }, [dispatch, setUserAuthData, i18n]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/board" element={<BoardsPage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
