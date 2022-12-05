import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import s from './modal.module.scss';

interface IProps {
  onConfirm: () => void;
  title: string;
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ onConfirm, title, isShowModal, setIsShowModal }: IProps) => {
  const { t } = useTranslation();
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleBtnTrue = () => {
    onConfirm();
    setIsShowModal(false);
  };

  return (
    <div className={isShowModal ? `${s.modal} ${s.active}` : s.modal} onClick={handleCloseModal}>
      <div
        className={isShowModal ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <div className={s.btnContent}>
          <button onClick={handleBtnTrue} className={s.btn} style={{ background: 'red' }}>
            {t('common:modalYes')}
          </button>
          <button onClick={handleCloseModal} className={s.btn}>
            {t('common:modalNo')}
          </button>
        </div>
        <div className={s.closeBtn} onClick={handleCloseModal}></div>
      </div>
    </div>
  );
};

export default Modal;
