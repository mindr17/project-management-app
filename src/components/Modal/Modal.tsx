import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { isModal } from '../../store/modal/sliceModal';
import s from './modal.module.scss';

interface IProps {
  modalBtnTrue: () => void; // как назвать эту функцию, она выполняеться при agree
  title: string;
}

const Modal = ({ onConfirm, title }: IProps) => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(isModal(false));
  };

  const handleBtnTrue = () => {
    onConfirm();
    dispatch(isModal(false));
  };

  return (
    <div className={activeModal ? `${s.modal} ${s.active}` : s.modal} onClick={handleCloseModal}>
      <div
        className={activeModal ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <div className={s.btnContent}>
          <button onClick={handleBtnTrue} className={s.btn} style={{ background: 'red' }}>
            agree
          </button>
          <button onClick={handleCloseModal} className={s.btn}>
            cancel
          </button>
        </div>
        <div className={s.closeBtn} onClick={handleCloseModal}></div>
      </div>
    </div>
  );
};

export default Modal;
