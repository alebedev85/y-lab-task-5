import React, { useRef, memo } from 'react'
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname'
import './style.css'

function LoginForm(props) {
  const t = props.t;
  const cn = bem('loginForm')
  const login = useRef('login')
  const password = useRef('password')


  const callbacks = {
    onLogin: (e) => {
      e.preventDefault();
      props.onLogin(login.current.value, password.current.value);
    }
  }

  return (
    <form className={cn()}>
      <span className={cn('title')}>{t('login.title')}</span>
      <label className={cn('label')} htmlFor="login">
        {t('login.login')}<br />
        <input ref={login} className={cn('input')} id="login" type="text" />
      </label>
      <label className={cn('label')} htmlFor="password">
        {t('login.password')}<br />
        <input ref={password} className={cn('input')} id="password" type="password" />
      </label>
      <div className={cn('error', props.error ? 'active' : '')}>{props.error} </div>
      <button type='submit' onClick={callbacks.onLogin} className={cn('button')}>{t('login.button')}</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  error: PropTypes.string
}

export default memo(LoginForm)