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
      <span className={cn('title')}>{t('profile.title')}</span>
      <div className={cn('prop')}>
        <span className={cn('label')}>{t('profile.name')}: </span>
        <span className={cn('value')}>{user.profile?.name}</span>
      </div>
      <div className={cn('prop')}>
        <span className={cn('label')}>{t('profile.phone')}: </span>
        <span className={cn('value')}>{user.profile?.phone}</span>
      </div>
      <div className={cn('prop')}>
        <span className={cn('label')}>email: </span>
        <span className={cn('value')}>{user.email}</span>
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