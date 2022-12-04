import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store';
import { Footer } from '../src/components/Footer/Footer';
import { Header } from '../src/components/Header/Header';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
