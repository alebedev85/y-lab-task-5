import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'style.css';

function Account(props) {
  const cn = bem('Account');
  const t = props.t;

  return (
    <div className={cn()}>
      {props.username && <Link className={cn('link')} to="/profile">{props.username}</Link>}
      <button onClick={props.username ? props.onLogout : props.onLoginNavigate}>
        {props.username ? t('user.logout') : t('user.login')}
      </button>
    </div>
  )
}
Account.propTypes = {
  onLoginNavigate: PropTypes.func,
  onLogout: PropTypes.func,
  username: PropTypes.string,
  t: PropTypes.func
};

Account.defaultProps = {
  username: '',
  t: (text) => text
}
export default memo(Account)