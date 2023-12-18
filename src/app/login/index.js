import { memo, useCallback, useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import User from '../../components/account';
import useSelector from '../../hooks/use-selector';
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const store = useStore();
  const prevPath = new URLSearchParams(location.search).get('prevPath');
  const select = useSelector(state => ({
    error: state.auth.error,
    token: state.auth.token,
    username: state.auth.username,
    waiting: state.auth.waiting,
  }));
  if (select.token) navigate(prevPath || '/');

  useEffect(() => {
    store.actions.auth.resetError()
  }, [])

  const callbacks = {
    onLogin: useCallback(async (login, password) => {
      const token = await store.actions.auth.login(login, password);
      if (token) navigate(prevPath || '/');
    }, [store]),
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),
    onLoginNavigate: useCallback(() => {
      navigate(`/login?prevPath=${window.location.pathname + window.location.search}`);
    })
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <User username={select.username} onLoginNavigate={callbacks.onLoginNavigate} onLogout={callbacks.onLogout} t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm onLogin={callbacks.onLogin} error={select.error} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);