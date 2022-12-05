import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useForm } from 'react-hook-form';
import s from './auth.module.scss';
import { useRouter } from 'next/router';
import { signUpAndSignIn } from '../../store/auth/authThunk';
import { useEffect } from 'react';
import { callReset } from '../../store/auth/sliceAuth';
import Preloader from '../Preloader/Preloader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IFormData } from './interfaceAuth';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const { t } = useTranslation('signup');
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user, token } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(callReset());
    }

    if (isSuccess) {
      dispatch(callReset());
    }

    if (user && token) {
      router.push('/boardslist');
    }
  }, [token, isError, user, isSuccess, message, dispatch, router]);

  const onSubmit = (formData: IFormData) => {
    dispatch(signUpAndSignIn(formData));
    reset();
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit((formData) => {
          onSubmit(formData);
        })}
      >
        <section>
          <label className={s.label} htmlFor='name'>
            {t('formInput_name')}
          </label>
          <input
            id='name'
            type='text'
            className={s.input}
            {...register('name', {
              required: `${t('formInput_name_valid')}`,
              minLength: {
                value: 3,
                message: `${t('formInput_name_valid>3')}`,
              },
              pattern: {
                value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/u,
                message: `${t('formInput_name_validAlphabetic')}`,
              },
            })}
          />
          <div className={s.errorForm}>{errors.name?.message}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='login'>
            {t('formInput_login')}
          </label>
          <input
            id='login'
            type='text'
            className={s.input}
            {...register('login', {
              required: `${t('formInput_login_valid')}`,
              minLength: {
                value: 3,
                message: `${t('formInput_login_valid>3')}`,
              },
            })}
          />
          <div className={s.errorForm}>{errors.login?.message}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='password'>
            {t('formInput_pass')}
          </label>
          <input
            id='password'
            type='password'
            className={s.input}
            {...register('password', {
              required: `${t('formInput_pass_valid')}`,
              minLength: {
                value: 5,
                message: `${t('formInput_pass_valid>5')}`,
              },
            })}
          />
          <div className={s.errorForm}>{errors.password?.message}</div>
        </section>
        <button className={s.btn}>{t('formBtn_signup')}</button>
      </form>
      <span className={s.signUpLink}>
        {t('signUpLink_title')}
        <strong>
          <Link href={'/signin'}>{t('signUpLink')}</Link>
        </strong>
      </span>
      <ToastContainer position='top-center' autoClose={false} style={{ fontSize: '2rem' }} />
    </>
  );
}
