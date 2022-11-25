import Link from 'next/link';
import { useAppDispatch } from '../../hooks/hooks';
import { IBoard } from '../../store/boards/IBoard';
import s from './board.module.scss';

export const Board = (props: {board: IBoard}) => {
  const dispatch = useAppDispatch();

  return (
    <section className={s.board}>
      <div className={s.headerWrapper}>
        <h2 className={s.boardHeader}>{props.board.title}</h2>
        <img className={s.trashBin} src='/trash-bin.png' alt=''></img>
      </div>
      <div className={s.description}>
        Description of board. It is a small preview of the available information...
      </div>
      <button className={s.btn}>See details</button>
    </section>
  );
}