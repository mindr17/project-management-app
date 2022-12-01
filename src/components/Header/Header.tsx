import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { callReset, setToken, setUser } from '../../store/auth/sliceAuth';
import { logout } from '../../store/auth/authThunk';
import s from './header.module.scss';
import { IUserDataLs } from './interfaceHeader';
import { getTokenValidness } from '../utilities/getTokenValidness';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(callReset());
  };

  useEffect(() => {
    const lsUser =
      localStorage.getItem('user') &&
      (JSON.parse(localStorage.getItem('user') || '') as IUserDataLs | null);

    if (lsUser && !user) {
      dispatch(setUser(lsUser));
    }
    const lsToken =
      localStorage.getItem('token') &&
      (JSON.parse(localStorage.getItem('token') || '') as string | null);

    if (lsToken && !token) {
      dispatch(setToken(lsToken));
    }

    if (lsToken && getTokenValidness()) {
      onLogout();
    }
  }, []);

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link className={s.navLink} href={'#'}>
          EN
        </Link>
      </nav>
      {user ? (
        <>
          <Link className={s.navLink} href={'/'}>
            Main
          </Link>
          <Link className={s.navLink} href={'/profile'}>
            Profile
          </Link>
          <Link onClick={onLogout} className={s.navLink} href={'/signin'}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <nav className={s.nav}>
            <Link className={s.navLink} href={'signin'}>
              Sign In
            </Link>
          </nav>
          <nav className={s.nav}>
            <Link className={s.navLink} href={'signup'}>
              Sign Up
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};
