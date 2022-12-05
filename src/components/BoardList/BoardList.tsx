import { use, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBoards, createBoard } from '../../store/boards/boardsThunk';
import { IBoard } from '../../store/boards/IBoard';
import { Board } from './Board/Board';
import CreateBoardModal from './CreateBoardModal/Modal';
import { createTitle } from '../utilities/boardInfo';
import s from './boardlist.module.scss';

export const BoardList = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const [isShowModal, setIsShowModal] = useState(false);

  const onCreateClick = () => {
    setIsShowModal(true); // open modal view
  };

  interface IFormData {
    title: string;
    desc: string;
  }

  const handleCreate = (formData: IFormData) => {
    const title = createTitle(formData.title, formData.desc);
    dispatch(
      createBoard({
        title: title,
        owner: user ? user._id : '',
        users: user ? [user._id] : [],
      })
    ); // create board
  };

  return (
    <>
      <div className={s.boardList}>
        {boards.length > 0 &&
          boards.map((board: IBoard) => <Board key={board._id} board={board} />)}
        <section className={s.addBoard} onClick={onCreateClick}>
          <div className={s.plus}>+</div>
        </section>
      </div>
      <CreateBoardModal
        onConfirm={handleCreate}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </>
  );
};
