import './WelcomePage.css';
import data from '../../services/data';
import { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import Card from '../../app/components/Card/Card';
import CustomizedButton from '../../app/components/share/Button/CustomizedButton';
import { useAppSelector } from '../../app/hooks';
import Footer from '../../app/components/share/Footer/Footer';

const WelcomePage = () => {
  const [videoModalActive, setVideomodalactive] = useState(false);
  const { auth } = useAppSelector((state) => state.userAuthReducer);
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

      <div className="aboutTheProject">
        <h1>
          Система управления проектами <span className="titleProject">TEMPER</span>
        </h1>
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
      <div className="titleContainer">
        <p className="title">
          TEMPER позволяет эффективно организовывать работу по японской методологии канбан-досок.
        </p>
        <div className="imgTitle">
          <img src={require(`../../assets/img/board1.png`)} alt="board" />
        </div>
      </div>
      <div className="titleContainer2">
        <div className="imgTitle">
          <img src={require(`../../assets/img/board.png`)} alt="board" />
        </div>
        <p className="title">
          Вы сами выбираете, по какому принципу организовывать карточки на досках.
        </p>
      </div>
      <div className="aboutTheComand">
        <h2>О команде</h2>
        <div className="cards">
          {data.map((item, index) => (
            <Card
              key={index}
              imgSrc={item.imgSrc}
              name={item.name}
              description={item.description}

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
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;
