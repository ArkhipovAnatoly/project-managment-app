import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import { Button, Paper, Typography, InputBase } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import { boardAPI } from '../../../services/BoardService';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const [title, setTitle] = useState(props.columnTittle);
  const [updateColumn] = boardAPI.useUpdateColumnMutation();
  const { t } = useTranslation('boardsPage');

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
    setTitle((event.target as HTMLInputElement).value);
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
      <Tooltip title={t('columnTitleTool')}>
        <Typography
          className={`someBoardTitleText ${classes.textTitleColumn}`}
          onClick={showAllSettingsColumnTitle}
        >
          {props.columnTittle}
        </Typography>
      </Tooltip>

      <Paper className={'inputTitleChange'} sx={{ mb: '2px', mt: '4px', display: 'none' }}>
        <InputBase
          onFocus={onFocusButtonColumnTitle}
          onBlur={onBlurButtonColumnTitle}
          onChange={onChangeButtonColumnTitle}
          inputProps={{ maxLength: 20 }}
          sx={{ pl: '5px' }}
          value={title}
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
        <Tooltip title={t('columnTitleTool')}>
          <Button
            onClick={buttonApplyColumnTitle}
            className={'buttonApply'}
            variant="outlined"
            size="small"
            color="info"
          >
            <CheckIcon fontSize="small" />
          </Button>
        </Tooltip>
        <Tooltip title={t('columnTitleCancelTool')}>
          <Button
            onClick={buttonCloseColumnTitle}
            className={'buttonCancel'}
            variant="outlined"
            size="small"
            color="info"
          >
            <ClearIcon fontSize="small" />
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}
export default ColumnTitle;
