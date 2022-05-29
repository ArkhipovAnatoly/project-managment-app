import './WelcomePage.css';
import { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import data from '../../services/data';
import Modal from '@mui/material/Modal';
import { Box, FormControlLabel, Typography } from '@mui/material';
import Card from '../../app/components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomizedButton from '../../app/components/share/Button/CustomizedButton';
import { useTranslation } from 'react-i18next';
import { themeSlice } from '../../app/store/reducers/ThemeSlice';
import MaterialUISwitch from '@mui/material/Switch';
import { motion } from 'framer-motion';
import { blue } from '@mui/material/colors';
import ColorSwitch from '../../app/components/Switch/ColorSwitch';

const WelcomePage = () => {
  const [checkedLang, setCheckedLang] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const [videoModalActive, setVideomodalactive] = useState(false);
  const { t, i18n } = useTranslation('welcome');
  const { setTheme } = themeSlice.actions;
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setChecked(true);
    }
  }, []);

  const changeLanguageHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target as HTMLInputElement;
    setCheckedLang(event.target.checked);
    checked ? i18n.changeLanguage('Ru') : i18n.changeLanguage('En');
  };
  useEffect(() => {
    if (i18n.resolvedLanguage === 'Ru') {
      setCheckedLang(true);
    }
  }, [i18n.resolvedLanguage]);

  const textAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  };

  const textAnimation2 = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  };

  const changeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target as HTMLInputElement;
    checked ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
    setChecked(event.target.checked);
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
    <motion.section initial="hidden" whileInView="visible">
      <Box
        component="main"
        className="main app"
        sx={{
          bgcolor: 'background.default',
        }}
      >
        <div className="wrapper">
          <div className="autorizationBtns">
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  onChange={changeTheme}
                  checked={checked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label=""
            />
            <FormControlLabel
              control={
                <ColorSwitch
                  checked={checkedLang}
                  onChange={changeLanguageHandle}
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="warning"
                />
              }
              label={i18n.resolvedLanguage}
              labelPlacement="end"
              sx={{ color: blue[600] }}
            />
            {token && auth.isAuth ? (
              <CustomizedButton innerText={t('welcome:toMainPage')} link={'/main'} />
            ) : (
              <div className="button-wrapper">
                <CustomizedButton innerText={t('welcome:signIn')} link={'/signin'} />
                <CustomizedButton innerText={t('welcome:signUp')} link={'/signup'} />
              </div>
            )}
          </div>
          <div className="aboutTheProject">
            <motion.h1 initial="hidden" whileInView="visible" custom={1} variants={textAnimation}>
              {t('welcome:aboutProject')} <span className="titleProject">TEMPER</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              whileInView="visible"
              custom={2}
              variants={textAnimation}
              className="title"
            >
              {t('welcome:videoReview')}
            </motion.p>
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
          <motion.div
            custom={1}
            variants={textAnimation2}
            viewport={{ amount: 0.2 }}
            initial="hidden"
            whileInView="visible"
            className="titleContainer"
          >
            <p className="title">{t('welcome:whatAllows')}</p>
            <div className="imgTitle">
              <img src={'assets/img/board.png'} alt="board" />
            </div>
          </motion.div>
          <motion.div
            custom={2}
            variants={textAnimation2}
            viewport={{ amount: 0.2 }}
            initial="hidden"
            whileInView="visible"
            className="titleContainer2"
          >
            <p className="title">{t('welcome:advantage')}</p>
          </motion.div>
          <motion.div
            custom={3}
            variants={textAnimation2}
            viewport={{ amount: 0.2 }}
            initial="hidden"
            whileInView="visible"
            className="titleContainer3"
          >
            <div className="imgTitle">
              <img src={'assets/img/giphy.gif'} className="imgBoard" alt="boardGif" />
            </div>
            <div className="app-feat">
              <p className="title">
                <div className="checkContainer">
                  <img className="check" src={'assets/img/check.png'} alt="check" /> {t('appFeat')}
                </div>
              </p>
              <p className="title">
                <div className="checkContainer">
                  <img className="check" src={'assets/img/check.png'} alt="check" />{' '}
                  {t('firstFeat')}
                </div>
              </p>
              <p className="title">
                <div className="checkContainer">
                  <img className="check" src={'assets/img/check.png'} alt="check" />{' '}
                  {t('secondFeat')}
                </div>
              </p>
              <p className="title">
                {' '}
                <div className="checkContainer">
                  <img className="check" src={'assets/img/check.png'} alt="check" />{' '}
                  {t('thirdFeat')}.
                </div>
              </p>
            </div>
          </motion.div>
          <motion.div
            custom={4}
            variants={textAnimation2}
            viewport={{ amount: 'some' }}
            initial="hidden"
            whileInView="visible"
            className="titleContainer4"
          >
            <p className="title title-center">{t('welcome:moto')}</p>
          </motion.div>
          <div className="aboutTheComand">
            <h2> {t('welcome:teamInfo')} </h2>
            <motion.div
              custom={3}
              variants={textAnimation}
              viewport={{ amount: 0.2 }}
              initial="hidden"
              whileInView="visible"
              className="cards"
            >
              {data.map((item, index) => {
                return (
                  <Card
                    key={index}
                    imgSrc={item.imgSrc}
                    name={item.name}
                    description={
                      i18n.resolvedLanguage === 'Ru' ? item.descriptionRu : item.descriptionEn
                    }
                  />
                );
              })}
            </motion.div>
          </div>
        </div>
      </Box>
    </motion.section>
  );
};

export default WelcomePage;
