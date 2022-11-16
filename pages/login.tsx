import Head from "next/head";
import SignIn from "../src/components/auth/loginUser";
import styles from "../styles/Home.module.css";

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Auth</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>heder</header>
        <main className={styles.main}>
          <h1>Login</h1>
          <SignIn />
        </main>
      </div>
    </>
  );
}