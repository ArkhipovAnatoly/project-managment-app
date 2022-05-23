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
import { DeleteBoardResponse, DeleteUserResponse, StatusCode } from '../../../types';
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
  title: string;
  type: 'profile' | 'board';
};

export default function ConfirmModal({ title, type }: ConfirmModalProps) {
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
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const { setUserAuthData } = userAuthSlice.actions;

  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { t } = useTranslation(['profile', 'board', 'account']);
  const theme = useTheme();

  const modalClose = () => {
    setMessage('');
    dispatch(showConfirmModal(false));
  };
  const handleConfirm = async () => {
    let response: DeleteUserResponse | DeleteBoardResponse = {};
    setMessage('');
    switch (type) {
      case 'profile':
        response = (await deleteUser(auth.userId as string)) as DeleteUserResponse;
        break;
      case 'board':
        const id = localStorage.getItem('boardId');
        response = (await deleteBoard(id as string)) as DeleteBoardResponse;
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
          navigator('/');
        }, 1500);
        return;
      }

      switch (type) {
        case 'profile':
          setMessage(t('profile:statusErrorUserDelete'));
          break;
        case 'board':
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
        dispatch(setUserAuthData({ userId: '', token: '', isAuth: false }));
        setMessage(t('profile:statusOk'));
        setTimeout(() => {
          setMessage('');
          dispatch(showConfirmModal(false));
          navigator('/');
        }, 1500);
        break;
      case 'board':
        setMessage(t('board:statusDeleteOk'));
        setTimeout(() => {
          setMessage('');
          dispatch(showConfirmModal(false));
        }, 1500);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-title"
        BackdropComponent={Backdrop}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, padding: { xs: 1, sm: 4 }, width: { xs: 300, sm: 350 } }}>
            <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
              <PriorityHighIcon />
            </Avatar>
            <Typography marginTop={2} component="h3" variant="h6" id="modal-title">
              {title}
            </Typography>
            <Button
              sx={{
                mt: 2,
                color: theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.main',
              }}
              onClick={handleConfirm}
            >
              {t('profile:confirm')}
            </Button>
            <Button
              sx={{
                mt: 1,
                color: theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.main',
              }}
              onClick={modalClose}
            >
              {t('profile:back')}
            </Button>
            {(isDeletingUser || isDeletingBoard) && <CircularProgress size={26} color="error" />}
            {
              <FormHelperText
                error={isErrorUser || isErrorBoard}
                component="span"
                sx={{
                  color: ({ isSuccessBoard } || { isSuccessUser }) && 'success.main',
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
