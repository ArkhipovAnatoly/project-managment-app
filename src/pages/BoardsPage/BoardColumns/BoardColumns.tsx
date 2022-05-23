import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useSliceBoardsPage } from '../../../app/store/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import ModalWindow from '../ModalWindow';
import ColumnTitle from './ColumnTitle';
import ColumnTasks from './ColumnTasks';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DroppableProvided, DropResult, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

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

function BoardColumns() {
  const classes = useStyles();
  const { dataBoardsPage } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('boardsPage');

  const openModalWindowAddTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
  };

  const openModalWindowDeleteTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    const currentIndexTask = String(targetButtonModal?.dataset.taskindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
  };

  const openModalWindowEditTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    const currentIndexTask = String(targetButtonModal?.dataset.taskindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
    dispatch(reducers.changeTitleOfCurrentTask());
  };

  const openModalWindowDeleteColumn = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
  };

  const handleModalWindow = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const targetButtonModal = target.closest('.buttonModal') as HTMLElement;
    const nameForModalWindow = String(targetButtonModal?.dataset.modalname);
    dispatch(reducers.openModalWindow(true));
    dispatch(reducers.addNameForModalWindow(nameForModalWindow));

    switch (nameForModalWindow) {
      case 'addTask':
        openModalWindowAddTask(targetButtonModal);
        break;

      case 'deleteTask':
        openModalWindowDeleteTask(targetButtonModal);
        break;

      case 'editTask':
        openModalWindowEditTask(targetButtonModal);
        break;

      case 'deleteColumn':
        openModalWindowDeleteColumn(targetButtonModal);
        break;
    }
  };

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      dispatch(
        reducers.dragAndDropColumn({
          indexDestinationColumn: destination.index,
          indexSourceColumn: source.index,
        })
      );
    }

    if (type === 'task') {
      dispatch(
        reducers.dragAndDropTask({
          destinationColumn: destination.droppableId,
          sourceColumn: source.droppableId,
          indexDestinationTask: destination.index,
          indexSourceTask: source.index,
        })
      );
    }
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
              {dataBoardsPage.map((column, indexColumn) => {
                return (
                  <Draggable key={column.id} draggableId={column.id} index={indexColumn}>
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
                            indexColumn={indexColumn}
                            columnTittle={column.tittle}
                          ></ColumnTitle>
                          <ColumnTasks indexColumn={indexColumn} column={column} />
                          <Box className={classes.columnSettings}>
                            <Box
                              data-modalname="addTask"
                              data-columnindex={indexColumn}
                              onClick={handleModalWindow}
                              className={`${classes.columnAdd} buttonModal`}
                            >
                              <AddIcon color="action" />
                              <Typography color="text.secondary">{t('addNewTask')}</Typography>
                            </Box>
                            <Box
                              className={`buttonModal`}
                              data-modalname="deleteColumn"
                              data-columnindex={indexColumn}
                            >
                              <Tooltip title={t('deleteColumn')} onClick={handleModalWindow}>
                                <IconButton>
                                  <DeleteIcon color="action" />
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
      <ModalWindow />
    </Box>
  );
}
export default BoardColumns;
