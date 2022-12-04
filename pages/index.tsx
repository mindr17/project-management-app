import Head from 'next/head';
import s from '../src/styles/welcome.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type Props = {
  // Add custom props here
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    locale,
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'welcome'])),
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Welcome(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('welcome');
  return (
    <div className={s.container}>
      <Head>
        <title>Welcome</title>
        <meta name='description' content='Welcome page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={s.main}>
        <section className={s.textSection}>
          <h1 className={s.mainText}>{t('mainText')}</h1>
          <p className={s.remark}>{t('mainText_subtitle')}</p>
        </section>
        <div className={s.wrapper}>
          <section className={s.aboutBlock}>
            <h1 className={s.blockHeader}>{t('aboutBlock_header')}</h1>
            <div className={s.teamWrapper}>
              <div className={s.teammate}>
                <Image src='/avatar.png' alt='avatar' width={50} height={50} />
                <div className={s.teammateInfo}>
                  <p className={s.name}>{t('teammateInfo_name1')}</p>
                  <p className={s.position}>{t('teammateInfo_position1')}</p>
                </div>
              </div>
              <div className={s.teammate}>
                <Image src='/avatar.png' alt='avatar' width={50} height={50} />
                <div className={s.teammateInfo}>
                  <p className={s.name}>{t('teammateInfo_name2')}</p>
                  <p className={s.position}>{t('teammateInfo_position2')}</p>
                </div>
              </div>
              <div className={s.teammate}>
                <Image src='/avatar.png' alt='avatar' width={50} height={50} />
                <div className={s.teammateInfo}>
                  <p className={s.name}>{t('teammateInfo_name3')}</p>
                  <p className={s.position}>{t('teammateInfo_position3')}</p>
                </div>
              </div>
            </div>
          </section>
          <section className={s.descBlock}>
            <h1 className={s.blockHeader}>{t('descBlock_header')}</h1>
            <div className={s.descriptionWrapper}>
              <p className={s.description}>{t('descBlock_description')}</p>
            </div>
          </section>
          <section className={s.techBlock}>
            <h1 className={s.blockHeader}>{t('techBlock_header')}</h1>
            <div className={s.technologiesWrapper}>
              <div className={s.technologies}>
                <Image src='/typescript.png' alt='typescript' width={50} height={50} />
                <Image src='/redux.png' alt='redux' width={50} height={48} />
                <Image src='/react.png' alt='react' width={50} height={50} />
                <Image src='/next-js.png' alt='nextjs' width={50} height={50} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
