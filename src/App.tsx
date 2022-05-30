import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './app/components/layouts/AppLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Error from './pages/Error/Error';
import SignIn from './pages/SingIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import MainPage from './pages/MainPage/MainPage';
import { userAuthSlice } from './app/store/reducers/UserAuthSlice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import BoardsPage from './pages/BoardsPage/BoardsPage';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material';
import { getDesignTokens } from './app/theme/Theme';
import EditProfile from './pages/EditProfile/EditProfile';
import { themeSlice } from './app/store/reducers/ThemeSlice';

function App() {
  const { mode } = useAppSelector((state) => state.themeReducer);
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { setTheme } = themeSlice.actions;
  const appTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const lng = localStorage.getItem('i18nextLng');
    const theme = localStorage.getItem('theme');
    if (lng === 'En' || lng === 'Ru') {
      i18n.changeLanguage(lng);
    }
    if (theme === 'dark') {
      dispatch(setTheme());
    }

    token && dispatch(setUserAuthData({ token }));
    userId && dispatch(setUserAuthData({ userId }));
  }, [dispatch, setUserAuthData, i18n, setTheme]);

  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/board" element={<BoardsPage />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
