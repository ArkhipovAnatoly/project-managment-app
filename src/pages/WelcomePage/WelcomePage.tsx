import Card from '../../components/elements/Card/Card';
import './WelcomePage.css';
import data from '../../services/data';
import CustomizedButtons from '../../components/elements/Button/CustomizedButtons';
// import { useState } from 'react';
// import Modal from '@mui/material/Modal/Modal';

const WelcomePage = () => {
  // const [videoModalActive, setVideomodalactive] = useState(false);

  // const openModal = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setVideomodalactive(true);
  // };

  // const closeModal = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setVideomodalactive(false);
  // };

  return (
    <div className="wrapper">
      <div className="autorizationBtns">
        <CustomizedButtons />
      </div>
      <div className="intro">
        <div className="aboutTheProject">
          <h1>
            Название <span className="titleProject">проекта</span>
          </h1>
          <p className="title">О проекте:</p>
          <p className="title">Здесь нужно</p>
          <p className="title">будет добавить</p>
          <p className="title">инфу о нашем</p>
          <p className="title">проекте</p>
        </div>
      </div>

      <div className="videoPlaceholder">
        <a
          data-video="https://player.vimeo.com/video/174002812"
          href="#video"
          aria-controls="video-modal"
          // onClick={openModal}
        >
          <img
            className="hasShadow"
            src={require('../../assets/img/videoPlaceholder.jpg')}
            alt="Hero"
            width={896}
            height={504}
          />
        </a>
      </div>
      {/* <Modal
        id="video-modal"
        show={videoModalActive}
        handleClose={closeModal}
        video="https://player.vimeo.com/video/174002812"
        videoTag="iframe"
      /> */}
      <div className="aboutTheComand">
        <h1>Команда разработчиков</h1>
        <p className="title">Здесь нужно</p>
        <p className="title">будет добавить</p>
        <p className="title">инфу о команде</p>
        <div className="cards">
          {data.map((item, index) => (
            <Card
              key={index}
              imgSrc={item.imgSrc}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
