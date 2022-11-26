import Link from 'next/link';
import { useAppDispatch } from '../../hooks/hooks';
import { IBoard } from '../../store/boards/IBoard';
import s from './board.module.scss';
import { deleteBoard } from '../../store/boards/boardsThunk';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { parseTitle } from '../utilities/boardInfo';

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
        <h2 className={s.boardHeader}>{parseTitle(props.board.title).title}</h2>
        <img className={s.trashBin} src='/trash-bin.png' alt='trash-bin' onClick={onTrashClick}></img>
      </div>
      <div className={s.description}>
        {parseTitle(props.board.title).description}
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