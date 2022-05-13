import './WelcomePage.css';
import data from '../../services/data';
import { useState } from 'react';
import Modal from '@mui/material/Modal/Modal';
import { Box, Typography } from '@mui/material';
import Card from '../../app/components/Card/Card';
import { useAppSelector } from '../../app/hooks';
import CustomizedButton from '../../app/components/share/Button/CustomizedButton';
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
    <>
      <div className="wrapper">
        <main className="main">
          {auth.isAuth ? (
            <div className="autorizationBtns">
              <CustomizedButton innerText={'Go to Main page'} link={'/main'} />
            </div>
          ) : (
            <div className="autorizationBtns">
              <CustomizedButton innerText={'Sign in'} link={'/signin'} />
              <CustomizedButton innerText={'Sign up'} link={'/signup'} />
            </div>
          )}
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
                src={'assets/img/videoPlaceholder.jpg'}
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
              TEMPER позволяет эффективно организовывать работу по японской методологии
              канбан-досок.
            </p>
            <div className="imgTitle">
              <img src={'assets/img/board1.png'} alt="board" />
            </div>
          </div>
          <div className="titleContainer2">
            <div className="imgTitle">
              <img src={'assets/img/board.png'} alt="board" />
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
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
