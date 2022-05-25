import './Footer.css';
import * as React from 'react';
import { Backdrop, Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Avatar } from '@mui/material';

const actions = [
  {
    icon: <Avatar alt="Никита" src="/public/assets/img/git.png" />,
    name: 'Никита',
    operation: 'Никита',
  },
  {
    icon: <Avatar alt="Марина" src="/public/assets/img/git.png" />,
    name: 'Марина',
    operation: 'Марина',
  },
  {
    icon: <Avatar alt="Анатолий" src="/public/assets/img/git.png" />,
    name: 'Анатолий',
    operation: 'Анатолий',
  },
];

const Footer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (e, operation) => {
    e.preventDefault();
    if (operation == 'Никита') {
      window.open('https://github.com/Fespis', '_blank');
    } else if (operation == 'Марина') {
      window.open('https://github.com/Marina2609', '_blank');
    } else if (operation == 'Анатолий') {
      window.open('https://github.com/ArkhipovAnatoly', '_blank');
    }
    setOpen(!open);
  };

  return (
    <footer className="footer">
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
      <Box sx={{ height: 30, transform: 'translateZ(0px)' }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', width: 10, height: 10, bottom: 1, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((act) => (
            <SpeedDialAction
              key={act.name}
              icon={act.icon}
              tooltipTitle={act.name}
              tooltipOpen
              onClick={(e) => {
                handleClick(e, act.operation);
              }}
            ></SpeedDialAction>
          ))}
        </SpeedDial>
      </Box>
    </footer>
  );
};

export default Footer;
