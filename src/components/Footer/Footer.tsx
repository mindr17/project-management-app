import s from './footer.module.scss';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <section className={s.yearSection}>
        <span className={s.year}>2022</span>
      </section>
      <section className={s.githubSection}>
        <section className={s.wrapper}>
          <a href='https://github.com/mindr17' className={s.link}>
            <Image
              className={s.githubLogo}
              src='/github-logo.png'
              alt='github account'
              width={39}
              height={38}
            />
          </a>
          <a href='https://github.com/mindr17'>
            <p>mindr17</p>
          </a>
        </section>
        <section className={s.wrapper}>
          <a href='https://github.com/Andreyjkov' className={s.link}>
            <Image
              className={s.githubLogo}
              src='/github-logo.png'
              alt='github account'
              width={39}
              height={38}
            />
          </a>
          <a href='https://github.com/Andreyjkov'>
            <p>Andreyjkov</p>
          </a>
        </section>
        <section className={s.wrapper}>
          <a href='https://github.com/SergeyMikhalkin' className={s.link}>
            <Image
              className={s.githubLogo}
              src='/github-logo.png'
              alt='github account'
              width={39}
              height={38}
            />
          </a>
          <a href='https://github.com/SergeyMikhalkin'>
            <p>sergeyMikhalkin</p>
          </a>
        </section>
      </section>
      <section className={s.courseLogoSection}>
        <a href='https://rs.school/react/'>
          <Image
            className={s.rssLogo}
            src='/rss-logo.png'
            alt='rs-school'
            width={175}
            height={65}
          />
        </a>
      </section>
    </footer>
  );
};
