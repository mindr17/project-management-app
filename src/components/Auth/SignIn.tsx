import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useForm } from 'react-hook-form';
import { getUserById, login } from '../../store/auth/authThunk';
import { callReset } from '../../store/auth/sliceAuth';
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseJwt } from '../utilities/parseJwt';
import { IFormSignIn, IParseToken } from './interfaceAuth';
import s from './auth.module.scss';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation('signin');
  const dispatch = useAppDispatch();
  const { isError, isLoading, user, message, token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignIn>();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(callReset());
    }

    if (user && token) {
      dispatch(callReset());
      router.push('/boardslist');
    }
  }, [token, isError, user, message, dispatch, router]);

  useEffect(() => {
    if (token) {
      const parseToken: IParseToken = parseJwt(token);
      const idAndToken = { id: parseToken.id, token: token };
      dispatch(getUserById(idAndToken));
    }
  }, [dispatch, token]);

  const onSubmit = (formData: IFormSignIn) => {
    dispatch(login(formData));
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
          <div className={s.errorForm}>{errors.login?.message ? errors.login?.message : ''}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='password'>
            {t('formInput_password')}
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
        <button className={s.btn}>{t('formBtn_signin')}</button>
      </form>
      <Link className={s.signUpLink} href={'/signup'}>
        <strong>{t('signUpLink')}</strong>
      </Link>
      <ToastContainer position='top-center' autoClose={false} style={{ fontSize: '2rem' }} />
    </>
  );
}
