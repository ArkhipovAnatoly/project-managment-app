import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  Tooltip,
  Stack,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../hooks';
import { confirmModalSlice } from '../../store/reducers/ConfirmModalSlice';
import { useTranslation } from 'react-i18next';
import { editBoardSlice } from '../../store/reducers/EditBoardSlice';
import { updateBoardModalSlice } from '../../store/reducers/UpdateBoardModalSlice';
import { NavLink } from 'react-router-dom';
import { useSliceBoardsPage } from '../../../app/store/reducers/useSliceBoardsPage';
import { BoardData } from '../../../types';

export default function Board({ id, title, description }: BoardData) {
  const theme = useTheme();
  const { showConfirmModal } = confirmModalSlice.actions;
  const { setBoardData } = editBoardSlice.actions;
  const { showUpdateBoardModal } = updateBoardModalSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('board');
  const reducers = useSliceBoardsPage.actions;

  const openConfirmModal = () => {
    dispatch(setBoardData({ id, title, description }));
    dispatch(showConfirmModal({ open: true, what: '' }));
  };

  const openUpdateBoardModal = () => {
    dispatch(setBoardData({ id, title, description }));
    dispatch(showUpdateBoardModal(true));
  };

  const updateCurrentIndexBoard = () => {
    dispatch(setBoardData({ id, title, description }));
    if (id !== undefined) localStorage.setItem('idBoard', `${id}`);
    if (id !== undefined) dispatch(reducers.changeIndexOfCurrentBoard(id));
  };

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h6" component="div">
        {title}
      </Typography>

      <ListItem
        sx={{ cursor: 'pointer' }}
        divider
        secondaryAction={
          <Stack direction="row" gap={1}>
            <IconButton
              sx={{ color: theme.palette.mode === 'dark' ? 'common.white' : 'primary.main' }}
              edge="end"
              aria-label="edit"
              onClick={openUpdateBoardModal}
            >
              <Tooltip title={t('tooltipEditBoard')} arrow>
                <EditIcon fontSize="medium" />
              </Tooltip>
            </IconButton>
            <IconButton
              sx={{ color: theme.palette.mode === 'dark' ? 'common.white' : 'primary.main' }}
              edge="end"
              aria-label="delete"
              onClick={openConfirmModal}
            >
              <Tooltip title={t('tooltipDeleteBoard')} arrow>
                <DeleteIcon fontSize="medium" />
              </Tooltip>
            </IconButton>
          </Stack>
        }
      >
        <NavLink to="/board">
          <ListItemAvatar onClick={updateCurrentIndexBoard}>
            <Tooltip title={t('tooltipOpenBoard')} arrow>
              <FolderIcon
                color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
                fontSize="medium"
              />
            </Tooltip>
          </ListItemAvatar>
        </NavLink>
        <ListItemText primary={`${t('description')} ${description}`} />
      </ListItem>
    </>
  );
}
