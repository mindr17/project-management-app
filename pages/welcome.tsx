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
            <div className={s.teamWrapper}>
              <div className={s.teammate}>
                <img src='/avatar.png'></img>
                <div className={s.teammateInfo}>
                  <p className={s.name}>Andrey</p>
                  <p className={s.position}>Developer, Teamlead</p>
                </div>
              </div>
              <div className={s.teammate}>
                <img src='/avatar.png'></img>
                <div className={s.teammateInfo}>
                  <p className={s.name}>Andrey</p>
                  <p className={s.position}>Developer</p>
                </div>
              </div>
              <div className={s.teammate}>
                <img src='/avatar.png'></img>
                <div className={s.teammateInfo}>
                  <p className={s.name}>Sergey</p>
                  <p className={s.position}>Developer</p>
                </div>
              </div>
            </div>
          </section>
          <section className={s.descBlock}>
            <h1 className={s.blockHeader}>What our app can?</h1>
            <div className={s.descriptionWrapper}>
              <p className={s.description}>This app allow you to create projects and divide them by pices(tasks). 
                You can create as many project as you want. Moreover, set up your task 
                lifetime. Our team wish it help you to manage your projects and achieve
                your goals.</p>
            </div>
          </section>
          <section className={s.techBlock}>
            <h1 className={s.blockHeader}>What we use?</h1>
            <div className={s.technologiesWrapper}>
              <div className={s.technologies}>
                <img src='/typescript.png' alt='typescript'></img>
                <img src='/redux.png' alt='redux'></img>
                <img src='/react.png' alt='react'></img>
                <img src='/next-js.png' alt='nextjs'></img>
              </div>
            </div>
          </section>  
        </div>
      </main>
    </div>
  );
}