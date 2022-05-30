import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useSliceBoardsPage } from '../../../app/store/reducers/useSliceBoardsPage';
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Button,
  Paper,
  Typography,
  Checkbox,
} from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import type { DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Column, task, User } from '../../../types';
import { confirmModalSlice } from '../../../app/store/reducers/ConfirmModalSlice';
import { boardAPI } from '../../../services/BoardService';

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

interface Task {
  column?: Column;
  allUsers?: User[];
  provided: DroppableProvided;
  snapshot: DraggableStateSnapshot;
  task: task;
}

function Task(props: Task) {
  const classes = useStyles();
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();
  const { showConfirmModal } = confirmModalSlice.actions;
  const { valueForTitleToSaveCheckbox } = useAppSelector((state) => state.boardsPage);
  const [checked, setChecked] = React.useState(
    props.task.title.indexOf(valueForTitleToSaveCheckbox) !== -1 ? true : false
  );
  const [updateTask] = boardAPI.useUpdateTaskMutation();

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

  const getUserOfThisTask = (task: task) => {
    const taskIdUserCreator = task.userId;
    if (props.allUsers !== undefined) {
      const currentUserCreatorData = props.allUsers.find((user) => user.id === taskIdUserCreator);
      return currentUserCreatorData?.name;
    }
    return '';
  };

  const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const saveCheckboxValueWithTitle = event.target.checked
      ? `${props.task.title}${valueForTitleToSaveCheckbox}`
      : props.task.title.split(valueForTitleToSaveCheckbox).join('');

    await updateTask({
      userId: props.task.userId,
      boardId: `${localStorage.getItem('idBoard')}`,
      columnId: props.column?.id,
      currentColumn: props.column?.id,
      taskId: props.task.id,
      title: saveCheckboxValueWithTitle,
      description: props.task.description,
      order: props.task.order,
    });
  };

  return (
    <>
      <Paper
        sx={{
          maxWidth: props.snapshot.isDragging ? '100px' : '',
          opacity: props.snapshot.isDragging ? '0.8' : '',
        }}
        key={props.task.id}
        className={classes.columnTask}
        elevation={3}
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
        {...props.provided.dragHandleProps}
      >
        <Box className={classes.buttonsSetting}>
          <Box
            className="buttonModal"
            data-modalname="deleteTask"
            data-columnid={props.column?.id}
            data-taskindex={props.task.id}
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
            data-taskindex={props.task.id}
            onClick={handleModalWindow}
          >
            <Button color="secondary">
              <CreateIcon fontSize="small" color="action" />
            </Button>
          </Box>
          <Checkbox color="success" checked={checked} onChange={handleCheckbox} />
        </Box>
        <Box sx={{ pl: '16px', pr: '16px', display: 'flex', flexWrap: 'wrap' }}>
          <Typography>{getUserOfThisTask(props.task)}</Typography>
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
              {props.task.title.split(valueForTitleToSaveCheckbox).join('')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white' }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: '4px', display: 'flex', flexWrap: 'wrap', color: 'black' }}
            >
              {props.task.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}
export default React.memo(Task);
