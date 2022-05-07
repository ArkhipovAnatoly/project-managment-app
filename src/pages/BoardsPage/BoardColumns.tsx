import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Fade, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

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
    color: '#5e6c84',
  },
  columnTitle: {
    margin: 5,
    padding: 3,
    cursor: 'pointer',
  },
  columnTasks: {
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
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    cursor: 'pointer',
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
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
    color: '#5e6c84',
    minWidth: '50%',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
      borderRadius: 3,
      cursor: 'pointer',
    },
  },
  columnDelete: {
    borderRadius: '50%',
    padding: 5,
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '0 auto',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
    },
  },
  modalWindow: {
    width: '70%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffff',
    borderRadius: 3,
    outline: 'none',
  },
});

function BoardColumns() {
  const classes = useStyles();

  const [openWindow, setOpenWindow] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const { dataBoardsPage } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();

  const closeModalWindow = () => setOpenWindow(false);
  const openModalWindow = () => setOpenWindow(true);

  const handleTitle = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setTitleColumn(target.value as string);
  };

  const addNewColumn = () => {
    if (titleColumn) {
      dispatch(reducers.addNewColumn(titleColumn));
      closeModalWindow();
    }
  };

  const deleteThisColumn = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const currentButtonIndex = Number(target.closest('button')?.dataset.deletecol);
    dispatch(reducers.deleteColumn(currentButtonIndex));
  };

  return (
    <Box className={classes.columns}>
      {dataBoardsPage.map((column, index) => {
        return (
          <Box className={classes.column} key={`${column.tittle} ${index}`}>
            <Box className={classes.columnOptions}>
              <Box className={classes.columnTitle}>
                <Typography>{column.tittle}</Typography>
              </Box>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className={classes.columnTasks}
              >
                {column.tasks?.map((tasks, index) => {
                  return (
                    <Box className={classes.columnTask} key={`${tasks.taskTittle} ${index}`}>
                      <CardActionArea>
                        <Typography gutterBottom variant="h5">
                          {tasks.taskTittle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tasks.taskOption}
                        </Typography>
                      </CardActionArea>
                    </Box>
                  );
                })}
              </Stack>
              <Box className={classes.columnSettings}>
                <Box className={classes.columnAdd}>
                  <AddIcon /> <Typography>Add task</Typography>
                </Box>
                <Tooltip title="Delete Column" data-deletecol={index} onClick={deleteThisColumn}>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box className={classes.column}>
        <Box className={classes.columnAddOptions} onClick={openModalWindow}>
          <Box className={classes.columnAddOptionsText}>
            <AddIcon /> <Typography>Add new column</Typography>
          </Box>
        </Box>
      </Box>
      <Modal open={openWindow} onClose={closeModalWindow}>
        <Box className={classes.modalWindow}>
          <Box className={classes.modalWindow}>
            <Stack direction="column" spacing={5}>
              <Typography gutterBottom variant="h5">
                Add new column
              </Typography>
              <Stack direction="column" spacing={2}>
                <TextField
                  id="filled-basic"
                  label="Tittle"
                  variant="filled"
                  defaultValue={titleColumn}
                  onChange={handleTitle}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={addNewColumn}>
                  Apply
                </Button>
                <Button variant="outlined" onClick={closeModalWindow}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
export default BoardColumns;

{
  /* <ul className={Boards.columns}>
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
    </div>
    <div className={Boards.columnSettings}>
      <div className={Boards.columnAdd}>
        <AddIcon /> Добавить карточку
      </div>
      <div className={Boards.columnDelete}>
        <DeleteIcon />
      </div>
    </div>
  </div>
</li>
<li className={Boards.column}></li>
<li className={Boards.column}></li>
</ul> */
}
