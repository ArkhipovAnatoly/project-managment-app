import './Error.css';

const Error = () => {
  return (
    <div className="errorContainer">
      <div className="question">
        <p>ARE YOU LOST?</p>
        <p>
          Do you want to go{' '}
          <a className="goHome" href="/">
            home
          </a>
          ?
        </p>
      </div>
      <div className="errorImage">
        <img src={'assets/img/error.gif'} className="errorImg" alt="error image" />
      </div>
    </div>
  );
};

export default Error;
