import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useSliceBoardsPage } from '../../../app/store/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import ModalWindow from '../ModalWindow';
import ColumnTitle from './ColumnTitle';
import ColumnTasks from './ColumnTasks';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type {
  DroppableProvided,
  DropResult,
  DraggableStateSnapshot,
  DraggableLocation,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { boardAPI } from '../../../services/BoardService';
import { Column, CurrentBoardProps } from '../../../types';
import { task } from '../../../types';
import { confirmModalSlice } from '../../../app/store/reducers/ConfirmModalSlice';
import { userAPI } from '../../../services/UserService';

const useStyles = makeStyles({
  columns: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexGrow: 1,
    overflowX: 'auto',
    overflowY: 'hidden',
    maxHeight: '100%',
    padding: 0,
    '&::-webkit-scrollbar': {
      backgroundColor: '#dadada',
      height: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e3e3e3',
      height: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#bbbbbb',
      height: 7,
      borderRadius: 5,
    },
  },
  column: {
    minWidth: 265,
    height: 'fit-content',
    maxWidth: 'fit-content',
    backgroundClip: 'content-box',
    margin: '10px',
    listStyle: 'none',
  },
  columnOptions: {
    backgroundColor: '#ebecf0',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '60vh',
    position: 'relative',
    whiteSpace: 'normal',
    width: '100%',
    cursor: 'default',
  },
  columnAddOptions: {
    backgroundColor: '#ebecf0b8',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '50vh',
    minHeight: '50px',
    position: 'relative',
    whiteSpace: 'normal',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
      borderRadius: 3,
      cursor: 'pointer',
    },
  },
  columnAddOptionsText: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  columnSettings: {
    margin: 5,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnAdd: {
    margin: 5,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
    minWidth: '50%',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
      borderRadius: 3,
      cursor: 'pointer',
    },
  },
});

function BoardColumns(props: CurrentBoardProps) {
  const classes = useStyles();
  const { currentBoard } = props;
  const { indexOfCurrentColumn } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('boardsPage');
  const [updateColumn] = boardAPI.useUpdateColumnMutation();
  const [updateTask] = boardAPI.useUpdateTaskMutation();
  const { showConfirmModal } = confirmModalSlice.actions;
  const theme = useTheme();
  const { data: allUsers } = userAPI.useGetAllUsersQuery('');

  const openModalWindowAddTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
  };

  const openModalWindowDeleteColumn = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(showConfirmModal({ open: true, what: 'column' }));
  };

  const handleModalWindow = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const targetButtonModal = target.closest('.buttonModal') as HTMLElement;
    const nameForModalWindow = String(targetButtonModal?.dataset.modalname);
    dispatch(reducers.openModalWindow(true));
    dispatch(reducers.addNameForModalWindow(nameForModalWindow));
    dispatch(reducers.changeIndexOfCurrentColumn('addColumn'));

    switch (nameForModalWindow) {
      case 'addTask':
        openModalWindowAddTask(targetButtonModal);
        break;

      case 'deleteColumn':
        openModalWindowDeleteColumn(targetButtonModal);
        break;
    }
  };

  const dragDropColumns = async (result: DropResult) => {
    const { destination, source } = result;
    const destinationColumnData = currentBoard?.columns?.find(
      (item) => item.order === destination.index
    );
    const sourceColumnData = currentBoard?.columns?.find((item) => item.order === source.index);
    await updateColumn({
      idBoard: `${localStorage.getItem('idBoard')}`,
      id: sourceColumnData?.id,
      title: sourceColumnData?.title as string,
      order: destinationColumnData?.order as number,
    });
  };

  const dragDropForTaskInOneColumn = async (result: DropResult) => {
    const { destination, source } = result;
    const columnDestination = currentBoard?.columns.find((column) => {
      return column.id === destination.droppableId;
    });
    const columnSource = currentBoard?.columns.find((column) => {
      return column.id === source.droppableId;
    });
    const destinationTaskData = columnDestination?.tasks.find((task) => {
      return task.order === destination.index;
    });
    const sourceTaskData = columnSource?.tasks.find((task) => {
      return task.order === source.index;
    });
    if (sourceTaskData !== undefined && destinationTaskData !== undefined) {
      await updateTask({
        userId: sourceTaskData?.userId,
        boardId: `${localStorage.getItem('idBoard')}`,
        columnId: columnSource?.id,
        currentColumn: columnSource?.id,
        taskId: sourceTaskData?.id,
        title: sourceTaskData?.title as string,
        description: sourceTaskData?.description,
        order: destinationTaskData.order,
      });
    }
  };

  const dragDropForTaskInDifferentColumns = async (result: DropResult) => {
    const { destination, source } = result;
    const columnDestination = currentBoard?.columns.find((column) => {
      return destination.droppableId === 0 ? true : column.id === destination.droppableId;
    });
    const columnSource = currentBoard?.columns.find((column) => {
      return column.id === source.droppableId;
    });
    const destinationTaskData = columnDestination?.tasks.find((task) => {
      if (destination.index === 0) {
        return true;
      } else if (destination.index === task.order + 1) {
        return true;
      } else if (task.order === destination.index) {
        return true;
      }
    });
    const sourceTaskData = columnSource?.tasks.find((task) => {
      return task.order === source.index;
    });
    if (sourceTaskData !== undefined) {
      let newOrder: number | undefined;
      if (destination.index === 0) {
        newOrder = 1;
      } else if (destinationTaskData !== undefined) {
        newOrder = dragDropForLastAndFirstElement(destinationTaskData, destination);
      }

      await updateTask({
        userId: sourceTaskData?.userId,
        boardId: `${localStorage.getItem('idBoard')}`,
        columnId: columnDestination?.id,
        currentColumn: columnSource?.id,
        taskId: sourceTaskData?.id,
        title: sourceTaskData?.title as string,
        description: sourceTaskData?.description,
        order: newOrder,
      });
    }
  };

  const dragDropForLastAndFirstElement = (
    destinationTaskData: task,
    destination: DraggableLocation
  ) => {
    if (destination.index === destinationTaskData?.order + 1) {
      return destinationTaskData?.order + 1;
    } else {
      return destinationTaskData?.order;
    }
  };

  const dragEndHandler = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      dragDropColumns(result);
    }

    if (type === 'task') {
      if (destination.droppableId === source.droppableId) {
        dragDropForTaskInOneColumn(result);
      } else {
        dragDropForTaskInDifferentColumns(result);
      }
    }
  };

  const sortColumnByOrder = (columns: Column[]) => {
    return columns.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
  };

  return (
    <Box className={classes.columns}>
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided: DroppableProvided) => (
            <Box
              sx={{
                display: 'flex',
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentBoard !== undefined &&
                sortColumnByOrder([...currentBoard.columns]).map((column) => {
                  return (
                    <Draggable key={column.id} draggableId={column.id} index={column.order}>
                      {(provided: DroppableProvided, snapshot: DraggableStateSnapshot) => (
                        <Box
                          sx={{ opacity: snapshot.isDragging ? '0.8' : '' }}
                          key={column.id}
                          className={`${classes.column}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Box className={`${classes.columnOptions} mainDragAndDropBox`}>
                            <ColumnTitle
                              columnId={column.id}
                              columnTittle={column.title}
                              columnOrder={column.order}
                            ></ColumnTitle>
                            <ColumnTasks column={column} allUsers={allUsers} />
                            <Box className={classes.columnSettings}>
                              <Box
                                data-modalname="addTask"
                                data-columnindex={column.id}
                                onClick={handleModalWindow}
                                className={`${classes.columnAdd} buttonModal`}
                              >
                                <AddIcon color="warning" />
                                <Typography
                                  color={theme.palette.mode === 'dark' ? 'common.dark' : 'primary'}
                                >
                                  {t('addNewTask')}
                                </Typography>
                              </Box>
                              <Box
                                className={`buttonModal`}
                                data-modalname="deleteColumn"
                                data-columnindex={column.id}
                              >
                                <Tooltip title={t('deleteColumn')} onClick={handleModalWindow}>
                                  <IconButton>
                                    <DeleteIcon
                                      color={
                                        theme.palette.mode === 'dark' ? 'secondary' : 'primary'
                                      }
                                    />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Box className={classes.column}>
        <Box
          data-modalname="addColumn"
          className={`${classes.columnAddOptions} buttonModal`}
          onClick={handleModalWindow}
        >
          <Box className={classes.columnAddOptionsText}>
            <AddIcon color={'action'} />
            <Typography color="text.secondary">{t('addNewColumn')}</Typography>
          </Box>
        </Box>
      </Box>
      {indexOfCurrentColumn !== '' ? <ModalWindow currentBoard={currentBoard} /> : <></>}
    </Box>
  );
}
export default BoardColumns;
