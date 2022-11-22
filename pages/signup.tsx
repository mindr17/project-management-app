import Head from 'next/head';
import SignUp from '../src/components/Auth/SignUp';
import s from '../styles/signup.module.scss';
export default function Register() {
  return (
    <div className={s.container}>
      <Head>
        <title>register</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={s.main}>
        <h1>Register</h1>
        <SignUp />
      </main>
    </div>
  );
}
