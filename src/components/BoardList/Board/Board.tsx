import Link from 'next/link';
import { useAppDispatch } from '../../../hooks/hooks';
import { IBoard } from '../../../store/boards/IBoard';
import s from './board.module.scss';
import { deleteBoard } from '../../../store/boards/boardsThunk';
import Modal from '../../ModalDelete/Modal';
import { useState } from 'react';
import { parseTitle } from '../../utilities/boardInfo';
import { useTranslation } from 'react-i18next';

export const Board = (props: { board: IBoard }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isShowModal, setIsShowModal] = useState(false);

  const onTrashClick = () => {
    setIsShowModal(true); // open modal view
  };

  const handleDelete = () => {
    dispatch(deleteBoard(props.board._id)); // delete board
  };

  return (
    <section className={s.board}>
      <div className={s.headerWrapper}>
        <h2 className={s.boardHeader}>{parseTitle(props.board.title).title}</h2>
        <img
          className={s.trashBin}
          src='/trash-bin.png'
          alt='trash-bin'
          onClick={onTrashClick}
        ></img>
      </div>
      <div className={s.description}>{parseTitle(props.board.title).description}</div>
      <Link href={`/boards/${props.board._id}`}>
        <button className={s.btn}>{t('boardsList:btn')}</button>
      </Link>
      <Modal
        onConfirm={handleDelete}
        title={t('boardsList:modal_title')}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </section>
  );
};
