import Link from 'next/link';
import { useAppDispatch } from '../../hooks/hooks';
import { IBoard } from '../../store/boards/IBoard';
import s from './board.module.scss';
import { deleteBoard } from '../../store/boards/boardsThunk';
import { isModal } from '../../store/modal/sliceModal';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export const Board = (props: {board: IBoard}) => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState(props.board._id);
  console.log("props.board._id111 ", id);

  const onTrashClick = () => {
    // dispatch(isModal(true)); // open modal window
    dispatch(deleteBoard(id));
  }

  const handleDelete = () => {
    //console.log("props.board._id ", id);
    
    //dispatch(deleteBoard(id));
  }

  return (
    <section className={s.board}>
      <div className={s.headerWrapper}>
        <h2 className={s.boardHeader}>{props.board.title}</h2>
        <img className={s.trashBin} src='/trash-bin.png' alt='trash-bin' onClick={onTrashClick}></img>
      </div>
      <div className={s.description}>
        Description of board. It is a small preview of 
        {props.board._id}
      </div>
      <button className={s.btn}>See details</button>
      <Modal onConfirm={handleDelete} title={'Do you want to delete the board?'} />
    </section>
  );
}