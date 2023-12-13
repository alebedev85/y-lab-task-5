import { memo } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname'
import './style.css';

function ProfileData(props) {
  const user = props.user;
  const t = props.t;
  const cn = bem('profileData')
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('data')}>
        <div className={cn('name')}>
          <span className={cn('name-title')}>{t('profile.name')}: </span>
          <span className={cn('name-value')}>{user.profile?.name}</span>
        </div>
        <div className={cn('phone')}>
          <span className={cn('phone-title')}>{t('profile.phone')}: </span>
          <span className={cn('phone-value')}>{user.profile?.phone}</span>
        </div>
        <div className={cn('email')}>
          <span className={cn('email-title')}>email: </span>
          <span className={cn('email-value')}>{user.email}</span>
        </div>
      </div>
    </div >
  )
}

ProfileData.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    }),
    email: PropTypes.string
  })
}

ProfileData.defaultProps = {
  user: {
    profile: {
      name: '',
      phone: ''
    },
    email: ''
  }
}
export default memo(ProfileData);