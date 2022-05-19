import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import {
  BoardsPageState,
  useSliceBoardsPage,
} from '../../../app/store/reducers/useSliceBoardsPage';
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
  column?: BoardsPageState;
  indexColumn?: number;
}

function ColumnTasks(props: ColumnTasks) {
  const classes = useStyles();
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();

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
            {props.column?.tasks?.map((tasks, indexTask) => {
              return (
                <Draggable key={tasks.id} draggableId={tasks.id} index={indexTask}>
                  {(provided: DroppableProvided, snapshot: DraggableStateSnapshot) => (
                    <Paper
                      sx={{
                        maxWidth: snapshot.isDragging ? '100px' : '',
                        opacity: snapshot.isDragging ? '0.8' : '',
                      }}
                      key={`${tasks.taskTittle} ${indexTask}`}
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
                          data-columnindex={props.indexColumn}
                          data-taskindex={indexTask}
                          onClick={handleModalWindow}
                        >
                          <Button color="secondary">
                            <ClearIcon fontSize="small" color="action" />
                          </Button>
                        </Box>
                        <Box
                          className="buttonModal"
                          data-modalname="editTask"
                          data-columnindex={props.indexColumn}
                          data-taskindex={indexTask}
                          onClick={handleModalWindow}
                        >
                          <Button color="secondary">
                            <CreateIcon fontSize="small" color="action" />
                          </Button>
                        </Box>
                      </Box>
                      <Accordion elevation={0}>
                        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                          <Typography sx={{ mt: '4px', display: 'flex', flexWrap: 'wrap' }}>
                            {tasks.taskTittle}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: '4px', display: 'flex', flexWrap: 'wrap' }}
                          >
                            {tasks.taskOption}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Paper>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </>
  );
}
export default React.memo(ColumnTasks);
