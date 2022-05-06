import { TextField } from '@mui/material';
import { createRef, useEffect, useState } from 'react';
import Boards from './BoardsPage.module.css';
import BoardColumns from './BoardColumns';

function BoardsPage() {
  const [count, setCount] = useState(true);
  const [text, setText] = useState('My Project');
  const [prevText, setPrevText] = useState('My Project');

  useEffect(() => {
    inputSearch?.current?.focus();
  }, [count]);

  const inputSearch = createRef<HTMLInputElement>();

  function handle(еvent: React.MouseEvent) {
    const target = еvent.target as HTMLElement;
    console.log(target);
    setCount(false);
  }

  function onInputBlur(event: React.FocusEvent) {
    setCount(true);
  }

  function setNewText(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    if ((target as HTMLInputElement).value) {
      setText((target as HTMLInputElement).value);
    } else {
      setText(prevText);
    }
  }

  return (
    <main className={Boards.container}>
      <div>
        {count ? (
          <div className={Boards.inputSwap} onClick={handle}>
            {text}
          </div>
        ) : (
          <input
            type="text"
            className={Boards.inputSwapFalse}
            onBlur={onInputBlur}
            onChange={setNewText}
            ref={inputSearch}
            defaultValue={text}
          />
        )}
      </div>
      <div className={Boards.content}>
        <BoardColumns></BoardColumns>
      </div>
    </main>
  );
}
export default BoardsPage;
