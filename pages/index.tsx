import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../src/hooks/hooks";
import { callReset, ResponsesAuth, setToken, setUser } from "../src/store/auth/sliceAuth";
import { logout } from "../src/store/auth/authThunk";
import styles from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const lsUser =
      localStorage.getItem("user") &&
      (JSON.parse(localStorage.getItem("user") || "") as ResponsesAuth | null);
    lsUser && dispatch(setUser(lsUser));

    const lsToken =
      localStorage.getItem("token") &&
      (JSON.parse(localStorage.getItem("token") || "") as string | null);
    lsToken && dispatch(setToken(lsToken));
  }, []); // Нужно добавить в каждую новую страницу

  const onLogout = () => {
    dispatch(logout());
    dispatch(callReset());
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <button onClick={onLogout}>Logout</button>
        <Link href={"signin"}> go to login</Link>
      </header>
      <main className={styles.main}>
        {user ? (
          <h1 className={styles.title}> {`Welcome ${user.name}`}</h1>
        ) : (
          <>
            <h1 className={styles.title}>You need to login</h1>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
