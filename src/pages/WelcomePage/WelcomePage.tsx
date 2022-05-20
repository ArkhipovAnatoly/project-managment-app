import './WelcomePage.css';
import data from '../../services/data';
import { useState, MouseEvent } from 'react';
import Modal from '@mui/material/Modal';
import { Box, FormControlLabel, Typography } from '@mui/material';
import Card from '../../app/components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomizedButton from '../../app/components/share/Button/CustomizedButton';
import { useTranslation } from 'react-i18next';
import MaterialUISwitch from '../../app/components/switch/MaterialUISwitch';
import { themeSlice } from '../../app/store/reducers/ThemeSlice';

const WelcomePage = () => {
  const [videoModalActive, setVideomodalactive] = useState(false);
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const { t } = useTranslation('welcome');
  const { setTheme } = themeSlice.actions;
  const dispatch = useAppDispatch();

  const changeTheme = () => {
    dispatch(setTheme());
  };

  const openModal = (e: MouseEvent) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e: MouseEvent) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  return (
    <>
      <Box
        component={'main'}
        className="main"
        sx={{
          bgcolor: 'background.default',
        }}
      >
        <div className="wrapper">
          <div className="autorizationBtns">
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} onClick={changeTheme} />}
              label=""
            />
            {auth.isAuth ? (
              <CustomizedButton innerText={t('toMainPage')} link={'/main'} />
            ) : (
              <div className="button-wrapper">
                <CustomizedButton innerText={t('signIn')} link={'/signin'} />
                <CustomizedButton innerText={t('signUp')} link={'/signup'} />
              </div>
            )}
          </div>
          <div className="aboutTheProject">
            <h1>
              {t('aboutProject')} <span className="titleProject">TEMPER</span>
            </h1>
            <p className="title">{t('videoReview')}</p>
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
            <Box
              sx={{
                top: '30%',
                left: '30%',
                outline: 'none',
                position: 'absolute',
                borderRadius: 3,
              }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <iframe
                  src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  width="500px"
                  height="350px"
                />
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
      </Box>
    </>
  );
};

export default WelcomePage;
