import { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  CircularProgress,
  FormHelperText,
  Avatar,
  useTheme,
  Fade,
  Backdrop,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAPI } from '../../../services/UserService';
import { DeleteResponse, StatusCode } from '../../../types';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useTranslation } from 'react-i18next';
import { confirmModalSlice } from '../../store/reducers/ConfirmModalSlice';
import { boardAPI } from '../../../services/BoardService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type ConfirmModalProps = {
  title?: string;
  subtitle?: string;
  type: 'profile' | 'board' | 'column' | 'task';
};

export default function ConfirmModal({ title = '', type, subtitle = '' }: ConfirmModalProps) {
  const { open } = useAppSelector((state) => state.confirmModalReducer);
  const { showConfirmModal } = confirmModalSlice.actions;
  const [message, setMessage] = useState<string>('');
  const [
    deleteUser,
    { isLoading: isDeletingUser, isError: isErrorUser, isSuccess: isSuccessUser },
  ] = userAPI.useUserDeleteMutation();
  const [
    deleteBoard,
    { isLoading: isDeletingBoard, isError: isErrorBoard, isSuccess: isSuccessBoard },
  ] = boardAPI.useDeleteBoardMutation();
  const [
    deleteColumn,
    { isLoading: isDeletingColumn, isError: isErrorColumn, isSuccess: isSuccessColumn },
  ] = boardAPI.useDeleteColumnMutation();
  const [
    deleteTask,
    { isLoading: isDeletingTask, isError: isErrorTask, isSuccess: isSuccessTask },
  ] = boardAPI.useDeleteTaskMutation();
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const { indexOfCurrentColumn } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentTask } = useAppSelector((state) => state.boardsPage);
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const { dataBoard } = useAppSelector((state) => state.editBoardReducer);
  const navigator = useNavigate();
  const { t } = useTranslation(['profile', 'board', 'account']);
  const theme = useTheme();

  const handleConfirm = async () => {
    let response: DeleteResponse = {};
    setMessage('');
    switch (type) {
      case 'profile':
        response = (await deleteUser(auth.userId as string)) as DeleteResponse;
        break;
      case 'board':
        response = (await deleteBoard(dataBoard.id as string)) as DeleteResponse;
        break;
      case 'column':
        response = (await deleteColumn({
          boardId: dataBoard.id,
          deleteColumnId: indexOfCurrentColumn,
        })) as DeleteResponse;
        break;
      case 'task':
        response = (await deleteTask({
          boardId: dataBoard.id,
          deleteColumnId: indexOfCurrentColumn,
          deleteTaskId: indexOfCurrentTask,
        })) as DeleteResponse;
        break;
      default:
        break;
    }
    const status = response.error?.status;
    if (status) {
      if (status === StatusCode.InternalServerError) {
        setMessage(t('account:statusServerError'));
        return;
      }
      if (status === StatusCode.Unauthorized) {
        setMessage(t('board:authError'));
        setTimeout(() => {
          setMessage('');
          modalClose();
          localStorage.removeItem('token');
          dispatch(setUserAuthData({ token: '', isAuth: false }));
          navigator('/');
        }, 1500);
        return;
      }

      switch (type) {
        case 'profile':
          setMessage(t('profile:statusErrorUserDelete'));
          break;

        case 'board':
        case 'column':
        case 'task':
          setMessage(t('board:statusErrorBoardDelete'));
          break;
        default:
          break;
      }
      return;
    }
    switch (type) {
      case 'profile':
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        dispatch(setUserAuthData({ userId: '', token: '' }));
        setMessage(t('profile:statusDeleteOk'));
        setTimeout(() => {
          setMessage('');
          modalClose();
          navigator('/');
        }, 1500);
        break;
      case 'board':
      case 'column':
      case 'task':
        setMessage(t('board:statusDeleteOk'));
        setTimeout(() => {
          setMessage('');
          modalClose();
        }, 1500);
        break;
      default:
        break;
    }
  };
  const modalClose = () => {
    dispatch(showConfirmModal({ open: false, what: '' }));
    setMessage('');
  };
  return (
    <>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, padding: { xs: 1, sm: 4 }, width: { xs: 300, sm: 400 } }}>
            <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
              <PriorityHighIcon />
            </Avatar>
            <Typography marginTop={2} component="h3" variant="h6" id="modal-title">
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              {subtitle}
            </Typography>
            <Button
              color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
              sx={{
                mt: 2,
              }}
              onClick={handleConfirm}
            >
              {t('profile:confirm')}
            </Button>
            <Button
              color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
              sx={{
                mt: 2,
              }}
              onClick={modalClose}
            >
              {t('profile:back')}
            </Button>
            {(isDeletingUser || isDeletingBoard || isDeletingColumn || isDeletingTask) && (
              <CircularProgress size={26} color="error" />
            )}
            {
              <FormHelperText
                error={isErrorUser || isErrorBoard || isErrorColumn || isErrorTask}
                component="span"
                sx={{
                  color:
                    ({ isSuccessBoard } || { isSuccessUser } || { isSuccessColumn } || {
                        isSuccessTask,
                      }) &&
                    'success.main',
                  fontSize: '18px',
                }}
              >
                {message}
              </FormHelperText>
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
