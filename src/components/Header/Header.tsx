import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { callReset } from "../../store/auth/sliceAuth";
import { logout } from "../../store/auth/authThunk";
import s from "./header.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const onLogout = () => {
    dispatch(logout());
    dispatch(callReset());
  };

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link className={s.navLink} href={"#"}>
          EN
        </Link>
      </nav>
      {user ? (
        <>
          <Link onClick={onLogout} className={s.navLink} href={"/"}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <nav className={s.nav}>
            <Link className={s.navLink} href={"signin"}>
              Sign In
            </Link>
            <Link className={s.navLink} href={"signup"}>
              Sign Up
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};

