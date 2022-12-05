import Head from 'next/head';
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

export default function PageNotFound(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common');
  return (
    <div className={s.container}>
      <Head>
        <title>{'PageNotFound'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={s.main}>
        <h1>{t('PageNotFound')}</h1>
      </main>
    </div>
  );
}
