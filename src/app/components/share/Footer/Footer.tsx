import './Footer.css';
import { MouseEvent, useState } from 'react';
import { Backdrop, Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const actions = [
  {
    icon: <GitHubIcon />,
    name: 'Никита',
    operation: 'Никита',
  },
  {
    icon: <GitHubIcon />,
    name: 'Марина',
    operation: 'Марина',
  },
  {
    icon: <GitHubIcon />,
    name: 'Анатолий',
    operation: 'Анатолий',
  },
];

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (e: MouseEvent, operation: string) => {
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
      <Box sx={{ position: 'relative', height: '58px', transform: 'translateZ(0px)' }}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip"
          sx={{
            bottom: 0,
            position: 'absolute',
          }}
          icon={<GitHubIcon />}
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
