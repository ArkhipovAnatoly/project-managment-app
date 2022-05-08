import './WelcomePage.css';
import data from '../../services/data';
import { useState } from 'react';
import Modal from '@mui/material/Modal/Modal';
import { Box, Typography } from '@mui/material';
import Card from '../../app/components/Card/Card';

const WelcomePage = () => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  return (
    <div className="wrapper">
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
          aria-controls="videoModal"
          onClick={openModal}
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
      <Modal id="videoModal" open={videoModalActive} onClose={closeModal}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <iframe src="https://player.vimeo.com/video/174002812%22%3E"></iframe>
          </Typography>
        </Box>
      </Modal>

      <div className="aboutTheComand">
        <h2>О команде</h2>
        <p className="title">
          &#8222; В командной работе хорошо то, что с вами всегда есть кто-то ещё &#8220;
        </p>

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
