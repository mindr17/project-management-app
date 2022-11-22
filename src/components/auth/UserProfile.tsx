import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useForm } from 'react-hook-form';
import s from './auth.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, logout, updateUser } from '../../store/auth/authThunk';
import {
  callReset,
  ResponsesAuth,
  setIsDelete,
  setToken,
  setUser,
} from '../../store/auth/sliceAuth';

export interface IFormSignUp {
  name: string;
  login: string;
  password: string;
}

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { isSuccess, user, token, message, isError, isDelete, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormSignUp>({
    defaultValues: {
      name: user?.name || '',
      login: user?.login || '',
    },
  });

  // useEffect(() => {
  //   const lsUser =
  //     localStorage.getItem('user') &&
  //     (JSON.parse(localStorage.getItem('user') || '') as ResponsesAuth | null);

  //   if (lsUser && !user) {
  //     dispatch(setUser(lsUser));
  //   }
  //   const lsToken =
  //     localStorage.getItem('token') &&
  //     (JSON.parse(localStorage.getItem('token') || '') as string | null);

  //   if (lsToken && !token) {
  //     dispatch(setToken(lsToken));
  //   }
  // }, []); // при появлении хедара -> перенести в хедер

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (isDelete) {
      dispatch(callReset());
      toast.success('Profile Deleted!');
      dispatch(logout());
      dispatch(setIsDelete());
      router.push('/');
    }

    if (isSuccess) {
      dispatch(callReset());
      toast.success('Profile changed!');
      resetField('password');
    }

    if (isError) {
      toast.error(message);
      dispatch(callReset());
    }
  }, [isDelete, isSuccess, isError]);

  const onSubmit = (formData: IFormSignUp) => {
    user && dispatch(updateUser({ formData, token, id: user._id }));
  };

  const hendleDelete = () => {
    user && dispatch(deleteUser({ id: user._id, token }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <h1>Name: {user?.name}</h1>
      <h2>Login: {user?.login}</h2>
      <form
        className={s.form}
        onSubmit={handleSubmit((formData) => {
          onSubmit(formData);
        })}
      >
        <section>
          <label className={s.label} htmlFor='name'>
            Name
          </label>
          <input
            id='name'
            type='text'
            className={s.input}
            {...register('name', {
              required: 'Please enter name',
              minLength: {
                value: 3,
                message: 'name must contain more than 3 letters',
              },
              pattern: {
                value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/u,
                message: 'name must be alphabetic',
              },
            })}
          />
          <div className={s.errorForm}>{errors.name?.message}</div>
        </section>
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
          <div className={s.errorForm}>{errors.login?.message}</div>
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
        <button className={s.btn}>Change</button>
      </form>
      <button onClick={hendleDelete} className={s.btn} style={{ background: 'red' }}>
        Delete
      </button>
      <ToastContainer position='top-center' autoClose={false} style={{ fontSize: '2rem' }} />
    </>
  );
}
