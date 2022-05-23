import { Box, CircularProgress, Typography, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { boardAPI } from '../../../services/BoardService';
import ConfirmModal from '../modal/ConfirmModal';
import Board from './Board';

export default function Boards() {
  const { data: boards, isLoading, isError, isSuccess } = boardAPI.useGetAllBoardsQuery('');
  const { t } = useTranslation('board');

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

  return (
    <>
      {isSuccess && (
        <List dense>
          {boards?.map((board, i) => {
            return <Board {...board} key={i} />;
          })}
        </List>
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
      <ConfirmModal title={t('question')} type="board" />
    </>
  );
}
