import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { callReset, setToken, setUser } from '../../store/auth/sliceAuth';
import { logout } from '../../store/auth/authThunk';
import s from './header.module.scss';
import { IUserDataLs } from './interfaceHeader';
import { getTokenValidness } from '../utilities/getTokenValidness';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const changeTo = router.locale === 'en' ? 'ru' : 'en';

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
        <Link href={router.asPath} locale={changeTo}>
          <button>{t('change-locale', { changeTo })}</button>
        </Link>
      </nav>
      {user ? (
        <>
          <Link className={s.navLink} href={'/boardslist'}>
            {t('boards')}
          </Link>
          <Link className={s.navLink} href={'/profile'}>
            {t('profile')}
          </Link>
          <Link onClick={onLogout} className={s.navLink} href={'/'}>
            {t('logout')}
          </Link>
        </>
      ) : (
        <>
          <nav className={s.nav}>
            <Link className={s.navLink} href={'signin'}>
              {t('signIn')}
            </Link>
          </nav>
          <nav className={s.nav}>
            <Link className={s.navLink} href={'signup'}>
              {t('signUp')}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};
