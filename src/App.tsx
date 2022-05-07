import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './app/components/share/Header';
import SignIn from './app/components/SignIn';
import SignUp from './app/components/SignUp';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
export default App;
