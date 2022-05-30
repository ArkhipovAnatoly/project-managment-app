import React from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import type { DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Column, task, User } from '../../../types';
import Task from './Task';

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
  allUsers?: User[];
}

function ColumnTasks(props: ColumnTasks) {
  const classes = useStyles();

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
                      <Task
                        column={props.column}
                        allUsers={props.allUsers}
                        provided={provided}
                        snapshot={snapshot}
                        task={task}
                      ></Task>
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
