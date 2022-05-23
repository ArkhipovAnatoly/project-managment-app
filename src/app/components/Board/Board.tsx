import {
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  Tooltip,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../hooks';
import { confirmModalSlice } from '../../store/reducers/ConfirmModalSlice';
import { useTranslation } from 'react-i18next';

type BoardProps = {
  id?: string;
  title: string;
};

export default function Board({ id, title }: BoardProps) {
  const theme = useTheme();
  const { showConfirmModal } = confirmModalSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('board');

  const openModal = () => {
    localStorage.setItem('boardId', id as string);
    dispatch(showConfirmModal(true));
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          {title}
        </Typography>

        <ListItem
          sx={{ cursor: 'pointer' }}
          secondaryAction={
            <IconButton
              sx={{ color: theme.palette.mode === 'dark' ? 'common.white' : 'primary.main' }}
              edge="end"
              aria-label="delete"
              onClick={openModal}
            >
              <Tooltip title={t('tooltipDeleteBoard')} arrow>
                <DeleteIcon fontSize="large" />
              </Tooltip>
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Tooltip title={t('tooltipOpenBoard')} arrow>
              <FolderIcon color="primary" fontSize="large" />
            </Tooltip>
          </ListItemAvatar>
          <ListItemText primary={title} />
        </ListItem>
        <Divider />
      </Grid>
    </>
  );
}
