import Head from 'next/head';
import s from '../styles/welcome.module.scss';

export default function Welcome() {

  return (
    <div className={s.container}>
      <Head>
        <title>Welcome</title>
        <meta name='description' content='Welcome page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={s.main}>
        <h1 className={s.mainText}>Plan your success!</h1>
        <p className={s.remark}>*with our app</p>
      </main>
    </div>
  );
}