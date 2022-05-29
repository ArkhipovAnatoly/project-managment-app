import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useSliceBoardsPage } from '../../../app/store/reducers/useSliceBoardsPage';
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Button,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import type { DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Column, task } from '../../../types';
import { confirmModalSlice } from '../../../app/store/reducers/ConfirmModalSlice';

const useStyles = makeStyles({
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
  columnTask: {
    minWidth: '240px',
    maxWidth: '240px',
    height: 'auto',
    borderRadius: 3,
    cursor: 'pointer',
  },
  buttonsSetting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
});

interface ColumnTasks {
  column?: Column;
}

function ColumnTasks(props: ColumnTasks) {
  const classes = useStyles();
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();
  const { showConfirmModal } = confirmModalSlice.actions;

  const openModalWindowDeleteTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnid);
    const currentIndexTask = String(targetButtonModal?.dataset.taskindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
    dispatch(showConfirmModal({ open: true, what: 'task' }));
  };

  const openModalWindowEditTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnid);
    const currentIndexTask = String(targetButtonModal?.dataset.taskindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
  };

  const handleModalWindow = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const targetButtonModal = target.closest('.buttonModal') as HTMLElement;
    const nameForModalWindow = String(targetButtonModal?.dataset.modalname);
    dispatch(reducers.openModalWindow(true));
    dispatch(reducers.addNameForModalWindow(nameForModalWindow));

    switch (nameForModalWindow) {
      case 'deleteTask':
        openModalWindowDeleteTask(targetButtonModal);
        break;

      case 'editTask':
        openModalWindowEditTask(targetButtonModal);
        break;
    }
  };

  const sortTasksByOrder = (tasks: task[]) => {
    return tasks.sort((a, b) => {
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
    <>
      <Droppable droppableId={props.column?.id} type="task">
        {(provided: DroppableProvided) => (
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            className={classes.columnTasks}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.column !== undefined ? (
              sortTasksByOrder([...props.column.tasks]).map((task) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={task.order}>
                    {(provided: DroppableProvided, snapshot: DraggableStateSnapshot) => (
                      <Paper
                        sx={{
                          maxWidth: snapshot.isDragging ? '100px' : '',
                          opacity: snapshot.isDragging ? '0.8' : '',
                        }}
                        key={task.id}
                        className={classes.columnTask}
                        elevation={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box className={classes.buttonsSetting}>
                          <Box
                            className="buttonModal"
                            data-modalname="deleteTask"
                            data-columnid={props.column?.id}
                            data-taskindex={task.id}
                            onClick={handleModalWindow}
                          >
                            <Button color="secondary">
                              <ClearIcon fontSize="small" color="action" />
                            </Button>
                          </Box>
                          <Box
                            className="buttonModal"
                            data-modalname="editTask"
                            data-columnid={props.column?.id}
                            data-taskindex={task.id}
                            onClick={handleModalWindow}
                          >
                            <Button color="secondary">
                              <CreateIcon fontSize="small" color="action" />
                            </Button>
                          </Box>
                        </Box>
                        <Accordion elevation={0}>
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                              backgroundColor: 'white',
                              color: 'black',
                            }}
                          >
                            <Typography sx={{ mt: '4px', display: 'flex', flexWrap: 'wrap' }}>
                              {task.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: '4px', display: 'flex', flexWrap: 'wrap' }}
                            >
                              {task.description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Paper>
                    )}
                  </Draggable>
                );
              })
            ) : (
              <Box></Box>
            )}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </>
  );
}
export default React.memo(ColumnTasks);
