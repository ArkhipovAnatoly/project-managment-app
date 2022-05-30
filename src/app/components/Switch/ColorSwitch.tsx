import { blue } from '@material-ui/core/colors';
import { alpha, styled, Switch } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';

const ColorSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.mode === 'dark' ? `${yellow['A100']}` : `${blue['800']}`,
    '&:hover': {
      backgroundColor: alpha(blue['800'], theme.palette.action.hoverOpacity),
    },
  },

  '& .MuiSwitch-switchBase': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#aab4be',
    '&:hover': {
      backgroundColor: alpha(grey['800'], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.mode === 'dark' ? `${yellow['A100']}` : `${blue['800']}`,
  },
}));

export default ColorSwitch;
