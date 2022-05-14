import AddIcon from '@mui/icons-material/Add';
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
} from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';

const useStyles = makeStyles({
  columnTask: {
    minWidth: '95%',
    maxWidth: '200px',
    height: 'auto',
    borderRadius: 3,
    cursor: 'pointer',
  },
  buttonsSetting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
      {props.column?.tasks?.map((tasks, indexTask) => {
        return (
          <Paper
            key={`${tasks.taskTittle} ${indexTask}`}
            className={classes.columnTask}
            elevation={3}
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
        );
      })}
    </>
  );
}
export default ColumnTasks;
