import Link from 'next/link';
import { useAppDispatch } from '../../hooks/hooks';
import { IBoard } from '../../store/boards/IBoard';
import s from './board.module.scss';
import { deleteBoard } from '../../store/boards/boardsThunk';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export const Board = (props: {board: IBoard}) => {
  const dispatch = useAppDispatch();

  const [isShowModal, setIsShowModal] = useState(false);

  const onTrashClick = () => {
    setIsShowModal(true); // open modal view
  }

  const handleDelete = () => {
    dispatch(deleteBoard(props.board._id)); // delete board 
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
      <Modal
        onConfirm={handleDelete}
        title={'Do you want to delete the board?'}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </section>
  );
}