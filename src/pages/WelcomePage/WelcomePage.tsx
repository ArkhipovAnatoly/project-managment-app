import './WelcomePage.css';
import data from '../../services/data';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import Card from '../../app/components/Card/Card';
import { useAppSelector } from '../../app/hooks';
import CustomizedButton from '../../app/components/share/Button/CustomizedButton';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const [videoModalActive, setVideomodalactive] = useState(false);
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const { t } = useTranslation('welcome');

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
      <main className="main">
        <div className="wrapper">
          {auth.isAuth ? (
            <div className="autorizationBtns">
              <CustomizedButton innerText={t('toManPage')} link={'/main'} />
            </div>
          ) : (
            <div className="autorizationBtns">
              <CustomizedButton innerText={'Board'} link={'/board'} />
              <CustomizedButton innerText={t('signIn')} link={'/signin'} />
              <CustomizedButton innerText={t('signUp')} link={'/signup'} />
            </div>
          )}
          <div className="aboutTheProject">
            <h1>
              {t('aboutProject')} <span className="titleProject">TEMPER</span>
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
            <p className="title">{t('whatAllows')}</p>
            <div className="imgTitle">
              <img src={'assets/img/board.png'} alt="board" />
            </div>
          </div>
          <div className="titleContainer2">
            <p className="title">{t('advantage')}</p>
          </div>
          <div className="titleContainer3">
            <div className="imgTitle">
              <img src={'assets/img/giphy.gif'} className="imgBoard" alt="boardGif" />
            </div>
            <p className="title">{t('moto')}</p>
          </div>
          <div className="aboutTheComand">
            <h2> {t('teamInfo')} </h2>
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
      </main>
    </>
  );
};

export default WelcomePage;
