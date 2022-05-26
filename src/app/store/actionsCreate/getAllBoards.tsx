import { AppDispatch } from '../store';
import { MainPageState } from '../reducers/useSliceMainPage';

export const getBoards = () => async (dispatch: AppDispatch) => {
  //   try {
  //     const server = `https://react-app-kanban.herokuapp.com/boards/e108a59d-e97a-4952-a61b-f4fc44bf25f8/columns`;
  //     const token = localStorage.getItem('token');
  //     const header = {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         title: 'Done',
  //         order: 0,
  //       }),
  //     };
  //     const response = await fetch(server, header);
  //     const dataAPI = await response.json();
  //     console.log(dataAPI);
  //   } catch (err) {
  //     console.error(err);
  //   }
};
