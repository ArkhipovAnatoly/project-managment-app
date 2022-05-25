import { Box, CircularProgress, Typography, List } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { boardAPI } from '../../../services/BoardService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import ConfirmModal from '../modal/ConfirmModal';
import UpdateBoardModal from '../modal/UpdateBoardModal';
import Board from './Board';

export default function Boards() {
  const { data: boards, isLoading, isError, isSuccess } = boardAPI.useGetAllBoardsQuery('');
  const { dataBoard } = useAppSelector((state) => state.editBoardReducer);
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('board');

  useEffect(() => {
    isSuccess && dispatch(setUserAuthData({ isAuth: true }));
  }, [isSuccess]);

  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={26} color="info" />
      </Box>
    );
  }

  if (isSuccess && boards.length) {
    return (
      <>
        <List dense>
          {boards?.map((board, i) => {
            return <Board {...board} key={i} />;
          })}
        </List>
        <ConfirmModal title={`'${dataBoard.title}' ${t('question')}`} type="board" />
        <UpdateBoardModal />
      </>
    );
  }

  return (
    <>
      {isSuccess && !boards.length && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            {t('noBoards')}
          </Typography>
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            {t('errorLoad')}
          </Typography>
        </Box>
      )}
    </>
  );
}
