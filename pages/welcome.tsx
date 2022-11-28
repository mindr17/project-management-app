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
        <section className={s.textSection}>
          <h1 className={s.mainText}>Plan your success!</h1>
          <p className={s.remark}>*with our app</p>
        </section>
        <div className={s.wrapper}>
          <section className={s.aboutBlock}>
            <h1 className={s.blockHeader}>Who we are?</h1>
          </section>
          <section className={s.descBlock}>
            <h1 className={s.blockHeader}>What our app can?</h1>
          </section>
          <section className={s.techBlock}>
            <h1 className={s.blockHeader}>What we use?</h1>
          </section>  
        </div>
      </main>
    </div>
  );
}