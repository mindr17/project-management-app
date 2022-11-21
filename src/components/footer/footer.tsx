import Link from 'next/link';
import s from './footer.module.scss';


export const Footer = () => {
  return (
    <footer className={s.footer}>
      <section className={s.yearSection}>
        <span className={s.year}>2022</span>
      </section>
      <section className={s.githubSection}>
        <section className={s.wrapper}>
          <a href="https://github.com/mindr17"><img className={s.githubLogo} src="/github-logo.png" alt="github account"/></a>
          <a href="https://github.com/mindr17"><p>mindr17</p></a>
        </section>
        <section className={s.wrapper}>
          <a href="https://github.com/Andreyjkov"><img className={s.githubLogo} src="/github-logo.png" alt="github account"/></a>
          <a href="https://github.com/Andreyjkov"><p>Andreyjkov</p></a>
        </section>
        <section className={s.wrapper}>
          <a href="https://github.com/SergeyMikhalkin"><img className={s.githubLogo} src="/github-logo.png" alt="github account"/></a>
          <a href="https://github.com/SergeyMikhalkin"><p>sergeyMikhalkin</p></a>
        </section>
      </section>
      <section className={s.courseLogoSection}>
        <a href="https://rs.school/" ><img className={s.rssLogo} src="/rss-logo.png" alt="rs-school"></img></a>
      </section>
    </footer>
  );
}