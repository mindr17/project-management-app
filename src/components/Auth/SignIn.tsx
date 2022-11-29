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

export default function SignIn() {
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
      router.push('/');
    }
  }, [token, isError, user]);

  useEffect(() => {
    if (token) {
      const parseToken: IParseToken = parseJwt(token);
      const idAndToken = { id: parseToken.id, token: token };
      dispatch(getUserById(idAndToken));
    }
  }, [token]);

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
            Login
          </label>
          <input
            id='login'
            type='text'
            className={s.input}
            {...register('login', {
              required: 'Please enter login',
              minLength: {
                value: 3,
                message: 'login must contain more than 3 letters',
              },
            })}
          />
          <div className={s.errorForm}>{errors.login?.message ? errors.login?.message : ''}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className={s.input}
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 5,
                message: 'password must contain more than 5 characters',
              },
            })}
          />
          <div className={s.errorForm}>{errors.password?.message}</div>
        </section>
        <button className={s.btn}>Sign in</button>
      </form>
      <ToastContainer position='top-center' autoClose={false} style={{ fontSize: '2rem' }} />
      <Link className={s.signUpLink} href={'/signup'}>
        <strong>Create an account</strong>
      </Link>
    </>
  );
}
