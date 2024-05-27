import { ReactNode } from 'react';
import { dashboards } from '@/constans/dashboards_mockdata.json';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
import LogoWordMark from '@/image/logo-wordmark.svg';
import LogoIcon from '@/image/logo-icon.svg';
import IconAddBox from '@/image/ic-addbox.svg';
import IconCrown from '@/image/ic-crown.svg';
import IconArrow from '@/image/ic_arrow.svg';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const getColorClass = (id: number) => {
  const colorIndex = (id % 5) + 1;
  return `color-${colorIndex}`;
};

const Nav: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={cx('main')}>
      <div className={cx('navigator')}>
        <Link to='/' className={cx('logo')}>
          <img src={LogoIcon} className={cx('logo-icon')} alt='logo-icon' />
          <img
            src={LogoWordMark}
            className={cx('logo-wordmark')}
            alt='logo-wordmark'
          />
        </Link>
        <div className={cx('addDashboards')}>
          <p className={cx('addDashboards-title')}>Dash Boards</p>
          <img
            src={IconAddBox}
            alt='addBox'
            className={cx('addDashboards-addBox')}
          />
        </div>
        <ul className={cx('dashboards')}>
          {dashboards.map((dashboard) => (
            <li key={`key-${dashboard.id}`}>
              <NavLink
                to={`/dashboard/${dashboard.id}`}
                className={({ isActive }) =>
                  cx('dashboard', {
                    active: isActive,
                  })
                }
              >
                <div
                  className={cx('circle', getColorClass(dashboard.id))}
                ></div>
                <div className={cx('dashboard-title')}>
                  {dashboard.title}
                  <img
                    src={IconCrown}
                    className={cx('crown', {
                      notCreatedByMe: !dashboard.createdByMe,
                    })}
                    alt='crown'
                  />
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={cx('offsetButtons')}>
          <div className={cx('arrowButton', 'left')}>
            <img src={IconArrow} className={cx('arrow')} alt='leftArrow' />
          </div>
          <div className={cx('arrowButton', 'right')}>
            <img src={IconArrow} className={cx('arrow')} alt='rightArrow' />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Nav;
