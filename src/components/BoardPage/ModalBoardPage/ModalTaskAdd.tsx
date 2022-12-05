import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { IFormDataModal } from '../../../../pages/boards/[boardId]';
import { useTranslation } from 'react-i18next';
import s from './ModalTaskAdd.module.scss';

interface IProps {
  onConfirm: (formData: IFormDataModal) => void;
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

// export interface IFormData {
//   [key: string]: string;
// }

const CreateTaskModal = ({ onConfirm, isShowModal, setIsShowModal }: IProps) => {
  const { t } = useTranslation();
  const onSubmit = (formData: IFormDataModal) => {
    setIsShowModal(false);
    onConfirm(formData);
    reset();
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormDataModal>({
    defaultValues: {
      title: '',
      desc: '',
    },
  });

  return (
    <div className={isShowModal ? `${s.modal} ${s.active}` : s.modal} onClick={handleCloseModal}>
      <div
        className={isShowModal ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{t('modalAdd:titleTask')}</h2>

        <form
          className={s.form}
          onSubmit={handleSubmit((formData) => {
            onSubmit(formData);
          })}
        >
          <section>
            <label className={s.label} htmlFor='title'>
              {t('modalAdd:input_title')}
            </label>
            <input
              id='title'
              type='text'
              className={s.input}
              {...register('title', {
                required: `${t('modalAdd:title_valid')}`,
                minLength: {
                  value: 3,
                  message: `${t('modalAdd:title_valid>3')}`,
                },
                pattern: {
                  value: /^[0-9a-zA-Zа-яёА-ЯЁ\s\-]+$/u,
                  message: 'name must be alphabetic or contain digits',
                },
              })}
            />
            <div className={s.errorForm}>{errors.title?.message}</div>
          </section>
          <section>
            <label className={s.label} htmlFor='desc'>
              {t('modalAdd:input_desc')}
            </label>
            <textarea
              id='desc'
              className={s.input}
              {...register('desc', {
                required: `${t('modalAdd:desc_valid')}`,
                minLength: {
                  value: 3,
                  message: `${t('modalAdd:desc_valid>3')}`,
                },
              })}
            />
            <div className={s.errorForm}>{errors.desc?.message}</div>
          </section>

          <div className={s.btnContent}>
            <button onClick={handleCloseModal} className={s.btn}>
              {t('modalAdd:modal_no')}
            </button>
            <button className={s.btn}>{t('modalAdd:modal_yes')}</button>
          </div>
        </form>
        <div className={s.closeBtn} onClick={handleCloseModal}></div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
