import Head from 'next/head';
import SignUp from '../src/components/Auth/SignUp';
import s from '../src/components/Auth/auth.module.scss';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

type Props = {
  // Add custom props here
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    locale,
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'signup'])),
  },
});

export default function Register(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('signup');
  return (
    <div className={s.container}>
      <Head>
        <title>{t('register_h1')}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={s.main}>
        <h1>{t('register_h1')}</h1>
        <SignUp />
      </main>
    </div>
  );
}
