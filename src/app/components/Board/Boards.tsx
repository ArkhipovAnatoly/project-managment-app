import { boardAPI } from '../../../services/BoardService';
import Board from './Board';

export default function Boards() {
  const { data: boards, isLoading, isError, isSuccess } = boardAPI.useGetAllBoardsQuery('');
  return (
    <div>
      {boards?.map((board) => {
        return <Board {...board} key={board.boardId} />;
      })}
    </div>
  );
}
