import {
  Grid,
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

type BoardProps = {
  id?: string;
  title: string;
};

export default function Board({ id, title }: BoardProps) {
  const theme = useTheme();
  const { showConfirmModal } = confirmModalSlice.actions;
  const { setBoardData } = editBoardSlice.actions;
  const { showUpdateBoardModal } = updateBoardModalSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('board');

  const openModal = () => {
    dispatch(setBoardData({ id, title }));
    dispatch(showConfirmModal(true));
  };

  const openUpdateBoardModal = () => {
    dispatch(setBoardData({ id, title }));
    dispatch(showUpdateBoardModal(true));
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
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
                onClick={openModal}
              >
                <Tooltip title={t('tooltipDeleteBoard')} arrow>
                  <DeleteIcon fontSize="medium" />
                </Tooltip>
              </IconButton>
            </Stack>
          }
        >
          <ListItemAvatar>
            <Tooltip title={t('tooltipOpenBoard')} arrow>
              <FolderIcon color="primary" fontSize="medium" />
            </Tooltip>
          </ListItemAvatar>
          <ListItemText primary={title} />
        </ListItem>
      </Grid>
    </>
  );
}
