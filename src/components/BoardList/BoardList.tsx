import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBoards } from '../../store/boards/boardsThunk';
import { IBoard } from '../../store/boards/IBoard';
import { Board } from '../Board/Board';
import s from './boardlist.module.scss';

export const BoardList = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  useEffect(() =>{
    dispatch(getBoards());   
  }, []);
  
  return (
    <div className={s.boardList}>
      {
      boards.length > 0 &&
        boards.map((board: IBoard, index) => <Board key={index + 1} board={board} />)
      }
      <section className={s.addBoard}>
        <div className={s.plus}>+</div>
      </section>
    </div>
  );
}