import React, { useRef, memo, useState } from 'react'
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname'
import './style.css'

function LoginForm(props) {
  const t = props.t;
  const cn = bem('LoginForm')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')


  const callbacks = {
    onLogin: (e) => {
      setLogin(e.target.value)
    },
    onPassword: (e) => {
      setPassword(e.target.value)
    },
    onSubmit: (e) => {
      e.preventDefault();
      props.onLogin(login, password);
    }
  }

  return (
    <form className={cn()}>
      <span className={cn('title')}>{t('login.title')}</span>
      <label className={cn('label')} htmlFor="login">
        {t('login.login')}<br />
        <input className={cn('input')}
          id="login"
          type="text"
          value={login}
          onChange={callbacks.onLogin} />
      </label>
      <label className={cn('label')} htmlFor="password">
        {t('login.password')}<br />
        <input className={cn('input')}
          id="password"
          type="password"
          value={password}
          onChange={callbacks.onPassword} />
      </label>
      <div className={cn('error', props.error ? 'active' : '')}>{props.error} </div>
      <button type='submit' onClick={callbacks.onSubmit} className={cn('button')}>{t('login.button')}</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  error: PropTypes.string
}

export default memo(LoginForm)