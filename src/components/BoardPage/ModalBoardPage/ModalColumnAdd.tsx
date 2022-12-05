import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { IFormDataModal } from '../../../../pages/boards/[boardId]';
import s from './ModalTaskAdd.module.scss';

interface IProps {
  onConfirm: (formData: IFormDataModal) => void;
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

// export interface IFormData {
//   [key: string]: string;
// }

const CreateColumnModal = ({ onConfirm, isShowModal, setIsShowModal }: IProps) => {
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
        <h2>Create column</h2>

        <form
          className={s.form}
          onSubmit={handleSubmit((formData) => {
            onSubmit(formData);
          })}
        >
          <section>
            <label className={s.label} htmlFor='title'>
              Title
            </label>
            <input
              id='title'
              type='text'
              className={s.input}
              {...register('title', {
                required: 'Please enter title',
                minLength: {
                  value: 3,
                  message: 'title must contain more than 3 letters',
                },
                pattern: {
                  value: /^[0-9a-zA-Zа-яёА-ЯЁ\s\-]+$/u,
                  message: 'name must be alphabetic or contain digits',
                },
              })}
            />
            <div className={s.errorForm}>{errors.title?.message}</div>
          </section>
          <div className={s.btnContent}>
            <button onClick={handleCloseModal} className={s.btn}>
              cancel
            </button>
            <button className={s.btn}>create</button>
          </div>
        </form>
        <div className={s.closeBtn} onClick={handleCloseModal}></div>
      </div>
    </div>
  );
};

export default CreateColumnModal;
