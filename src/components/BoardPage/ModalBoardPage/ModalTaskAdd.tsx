import { Dispatch, SetStateAction } from 'react';
import s from './modal.module.scss';
import { useForm } from 'react-hook-form';

interface IProps {
  onConfirm: (formData: IFormData) => void;
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

interface IFormData {
  [key: string]: string;
}

const CreateBoardModal = ({ onConfirm, isShowModal, setIsShowModal }: IProps) => {
  const onSubmit = (formData: IFormData) => {
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
  } = useForm<IFormData>({
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
        <h2>Create board</h2>

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
          <section>
            <label className={s.label} htmlFor='desc'>
              Description
            </label>
            <textarea
              id='desc'
              className={s.input}
              {...register('desc', {
                required: 'Please enter description',
                minLength: {
                  value: 3,
                  message: 'description must contain more than 3 letters',
                },
              })}
            />
            <div className={s.errorForm}>{errors.desc?.message}</div>
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

export default CreateBoardModal;
