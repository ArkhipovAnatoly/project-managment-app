import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  BoardsPageState,
  useSliceBoardsPage,
} from '../../../app/store/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import ModalWindow from '../ModalWindow';
import ColumnTitle from './ColumnTitle';
import ColumnTasks from './ColumnTasks';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  columns: {
    display: 'flex',
    flexWrap: 'nowrap',
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
    maxHeight: '100%',
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
  columnTasks: {
    padding: 2,
    overflowX: 'auto',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      backgroundColor: '#dadada',
      width: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e3e3e3',
      width: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#bbbbbb',
      width: 7,
      borderRadius: 5,
    },
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
  const [currentCard, setCurrentCard] = useState(0);

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

  // const dragStartHandler = (
  //   event: React.DragEvent,
  //   column: BoardsPageState,
  //   indexColumn: number
  // ) => {
  //   console.log(column, 'drag', indexColumn);
  //   setCurrentCard(indexColumn);
  // };
  const dragEndHandler = (event) => {
    // const mainBox = (event.target as HTMLElement).closest('.mainDragAndDropBox') as HTMLElement;
    // mainBox.style.background = 'white';
    dispatch(
      reducers.dragAndDropColumn({
        indexColumn: event.destination.index,
        indexCurrentColumn: event.source.index,
      })
    );
  };
  // const dragOverHandler = (event: React.DragEvent) => {
  //   event.preventDefault();
  //   const mainBox = (event.target as HTMLElement).closest('.mainDragAndDropBox') as HTMLElement;
  //   mainBox.style.background = 'lightgray';
  // };
  // const dragHandler = (event: React.DragEvent, column: BoardsPageState, indexColumn: number) => {
  //   event.preventDefault();
  // dispatch(
  //   reducers.dragAndDropColumn({ indexColumn: indexColumn, indexCurrentColumn: currentCard })
  // );
  // };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Droppable droppableId="columns" direction="horizontal">
        {(provided) => (
          <Box className={classes.columns} {...provided.droppableProps} ref={provided.innerRef}>
            {dataBoardsPage.map((column, indexColumn) => {
              return (
                <Draggable key={column.id} draggableId={column.id} index={indexColumn}>
                  {(provided) => (
                    <Box
                      className={`${classes.column}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Box
                        className={`${classes.columnOptions} mainDragAndDropBox`}
                        // draggable={true}
                        // onDragStart={(event: React.DragEvent) => {
                        //   dragStartHandler(event, column, indexColumn);
                        // }}
                        // onDragLeave={(event: React.DragEvent) => {
                        //   dragEndHandler(event);
                        // }}
                        // onDragEnd={(event: React.DragEvent) => {
                        //   dragEndHandler(event);
                        // }}
                        // onDragOver={(event: React.DragEvent) => {
                        //   dragOverHandler(event);
                        // }}
                        // onDrop={(event: React.DragEvent) => {
                        //   dragHandler(event, column, indexColumn);
                        // }}
                      >
                        <ColumnTitle
                          indexColumn={indexColumn}
                          columnTittle={column.tittle}
                        ></ColumnTitle>
                        <Stack
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={2}
                          className={classes.columnTasks}
                        >
                          <ColumnTasks indexColumn={indexColumn} column={column} />
                        </Stack>
                        <Box className={classes.columnSettings}>
                          <Box
                            data-modalname="addTask"
                            data-columnindex={indexColumn}
                            onClick={handleModalWindow}
                            className={`${classes.columnAdd} buttonModal`}
                          >
                            <AddIcon color="action" />
                            <Typography color="text.secondary">Add task</Typography>
                          </Box>
                          <Box
                            className={`buttonModal`}
                            data-modalname="deleteColumn"
                            data-columnindex={indexColumn}
                          >
                            <Tooltip title="Delete Column" onClick={handleModalWindow}>
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
            <Box className={classes.column}>
              <Box
                data-modalname="addColumn"
                className={`${classes.columnAddOptions} buttonModal`}
                onClick={handleModalWindow}
              >
                <Box className={classes.columnAddOptionsText}>
                  <AddIcon color={'action'} />
                  <Typography color="text.secondary">Add new column</Typography>
                </Box>
              </Box>
            </Box>
            <ModalWindow />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default BoardColumns;
