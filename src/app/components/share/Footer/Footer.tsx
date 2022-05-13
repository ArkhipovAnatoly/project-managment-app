import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="aboutTheCourse">
          <a
            className="rss"
            href="https://rs.school/react/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="rssYear">`22</span>{' '}
          </a>
        </div>
        <div className="githab">
          <a href="https://github.com/ArkhipovAnatoly" target="_blank" rel="noopener noreferrer">
            Анатолий
          </a>
          <a href="https://github.com/Marina2609" target="_blank" rel="noopener noreferrer">
            Марина
          </a>
          <a href="https://github.com/Fespis" target="_blank" rel="noopener noreferrer">
            Никита
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
