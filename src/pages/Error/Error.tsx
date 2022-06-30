import { NavLink } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div className="errorContainer">
      <div className="question">
        <p>ARE YOU LOST?</p>
        <p>
          Do you want to go{' '}
          <NavLink className="goHome" to="/">
            home
          </NavLink>
          ?
        </p>
      </div>
    </div>
  );
};

export default Error;
