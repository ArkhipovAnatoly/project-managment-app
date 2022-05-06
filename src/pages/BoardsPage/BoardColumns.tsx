import Boards from './BoardsPage.module.css';
import AddIcon from '@mui/icons-material/Add';

function BoardColumns() {
  return (
    <>
      <ul className={Boards.columns}>
        <li className={Boards.column}>
          <div className={Boards.columnOptions}>
            <div className={Boards.columnTitle}>Нужно сделать</div>
            <div className={Boards.columnTasks}>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
              <div className={Boards.columnTask}>
                <div>Some Task</div>
                <div>Some Options</div>
              </div>
            </div>
            <div className={Boards.columnAdd}>
              <AddIcon /> Добавить карточку
            </div>
          </div>
        </li>
        <li className={Boards.column}></li>
        <li className={Boards.column}></li>
      </ul>
    </>
  );
}
export default BoardColumns;
