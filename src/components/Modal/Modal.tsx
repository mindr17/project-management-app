import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { isModal } from '../../store/modal/sliceModal';
import s from './modal.module.scss';

interface IProps {
  modalBtnTrue: () => void; // как назвать эту функцию, она выполняеться при agree
  title: string;
}

const Modal = ({ modalBtnTrue, title }: IProps) => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.modal);

  const hendleCloseModal = () => {
    dispatch(isModal(false));
  };

  const hendleBtnTrue = () => {
    modalBtnTrue();
    dispatch(isModal(false));
  };

  return (
    <div className={activeModal ? `${s.modal} ${s.active}` : s.modal} onClick={hendleCloseModal}>
      <div
        className={activeModal ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <div className={s.btnContent}>
          <button onClick={hendleBtnTrue} className={s.btn} style={{ background: 'red' }}>
            agree
          </button>
          <button onClick={hendleCloseModal} className={s.btn}>
            cancel
          </button>
        </div>
        <div className={s.closeBtn} onClick={hendleCloseModal}></div>
      </div>
    </div>
  );
};

export default Modal;
