import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Paper, Typography, InputBase } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { boardAPI } from '../../../services/BoardService';

const useStyles = makeStyles({
  columnTitle: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 3,
    cursor: 'pointer',
  },
  textTitleColumn: {
    transition: 'all 0.2s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#bdbdbd91',
      borderRadius: 3,
    },
  },
});

interface ColumnTitle {
  columnId?: string;
  columnTittle?: string;
  columnOrder?: number;
}

function ColumnTitle(props: ColumnTitle) {
  const classes = useStyles();
  const [updateColumn] = boardAPI.useUpdateColumnMutation();

  const showAllSettingsColumnTitle = (event: React.MouseEvent) => {
    const mainBox = (event.target as HTMLInputElement).closest('.boxForTitleColumn') as HTMLElement;
    const buttonsForTitle = mainBox.querySelector('.buttonsForTitle') as HTMLElement;
    const inputTitleChange = mainBox.querySelector('.inputTitleChange') as HTMLElement;

    const target = event.target as HTMLElement;
    buttonsForTitle.style.display = 'block';
    inputTitleChange.style.display = 'block';
    target.style.display = 'none';
    const inputForTitleColumn = inputTitleChange.querySelector('input') as HTMLInputElement;
    inputForTitleColumn.focus();
  };

  const onFocusButtonColumnTitle = (event: React.FocusEvent) => {
    const mainBox = (event.target as HTMLInputElement).closest('.boxForTitleColumn') as HTMLElement;
    const someBoardTitleText = mainBox.querySelector('.someBoardTitleText');
    mainBox.dataset.onopen = '';
    mainBox.dataset.onclose = someBoardTitleText?.textContent as string;
  };

  const onBlurButtonColumnTitle = (event: React.FocusEvent) => {
    const target = event.target as HTMLInputElement;
    target.value = ``;
  };

  const onChangeButtonColumnTitle = (event: React.ChangeEvent) => {
    const mainBox = (event.target as HTMLInputElement).closest('.boxForTitleColumn') as HTMLElement;
    mainBox.dataset.onopen = (event.target as HTMLInputElement).value;
  };

  const buttonApplyColumnTitle = async (event: React.MouseEvent) => {
    const mainBox = (event.target as HTMLElement).closest('.boxForTitleColumn') as HTMLElement;
    const buttonsForTitle = mainBox.querySelector('.buttonsForTitle') as HTMLElement;
    const inputTitleChange = mainBox.querySelector('.inputTitleChange') as HTMLElement;
    const someBoardTitleText = mainBox.querySelector('.someBoardTitleText') as HTMLElement;
    if ((mainBox.dataset.onopen as string) !== '') {
      buttonsForTitle.style.display = 'none';
      inputTitleChange.style.display = 'none';
      someBoardTitleText.style.display = 'block';
      await updateColumn({
        idBoard: `${localStorage.getItem('idBoard')}`,
        id: props.columnId,
        title: mainBox.dataset.onopen as string,
        order: props.columnOrder as number,
      });
    }
  };
  const buttonCloseColumnTitle = (event: React.MouseEvent) => {
    const mainBox = (event.target as HTMLElement).closest('.boxForTitleColumn') as HTMLElement;
    const buttonsForTitle = mainBox.querySelector('.buttonsForTitle') as HTMLElement;
    const inputTitleChange = mainBox.querySelector('.inputTitleChange') as HTMLElement;
    const someBoardTitleText = mainBox.querySelector('.someBoardTitleText') as HTMLElement;
    buttonsForTitle.style.display = 'none';
    inputTitleChange.style.display = 'none';
    someBoardTitleText.style.display = 'block';
  };

  return (
    <Box
      className={`${classes.columnTitle} boxForTitleColumn`}
      data-onopen={props.columnTittle}
      data-onclose={props.columnTittle}
    >
      <Typography
        className={`someBoardTitleText ${classes.textTitleColumn}`}
        onClick={showAllSettingsColumnTitle}
      >
        {props.columnTittle}
      </Typography>
      <Paper className={'inputTitleChange'} sx={{ mb: '2px', mt: '4px', display: 'none' }}>
        <InputBase
          onFocus={onFocusButtonColumnTitle}
          onBlur={onBlurButtonColumnTitle}
          onChange={onChangeButtonColumnTitle}
          inputProps={{ maxLength: 20 }}
          sx={{ pl: '5px' }}
        />
      </Paper>
      <Stack
        className={'buttonsForTitle'}
        sx={{ mt: '4px', display: 'none' }}
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Button
          onClick={buttonApplyColumnTitle}
          className={'buttonApply'}
          variant="outlined"
          size="small"
          color="info"
          startIcon={<SendIcon />}
        ></Button>
        <Button
          onClick={buttonCloseColumnTitle}
          className={'buttonCancel'}
          variant="outlined"
          size="small"
          color="info"
          startIcon={<DeleteIcon />}
        ></Button>
      </Stack>
    </Box>
  );
}
export default ColumnTitle;
