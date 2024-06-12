import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { CardProps } from '@/types/types';
import IconCalendar from '@/image/ic-calendar.svg';

import { v4 as uuidv4 } from 'uuid';
import Profile from '@components/common/Profile';

const cx = classNames.bind(styles);

// const getRandomColorClass = (id: number) => {
//   const colorIndex = Math.floor(Math.random() * 5) + 1;
//   return `color-${colorIndex}`;
// };

const getColorClass = (tags: string[], tag: string) => {
  const index = tags.indexOf(tag);
  const colorIndex = (index % 5) + 1;
  return `color-${colorIndex}`;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const Card: React.FC<{
  card: CardProps;
}> = ({ card }) => {
  return (
    <div className={cx('card')}>
      {card.imageUrl && (
        <img
          src={card.imageUrl}
          alt={card.title}
          className={cx('card-image')}
        />
      )}
      <div className={cx('card-body')}>
        <p className={cx('card-body-title')}>{card.title}</p>
        <ul className={cx('card-body-tags')}>
          {card.tags.map((tag) => (
            <li key={uuidv4()}>
              <div
                className={cx(
                  'card-body-tags-tag',
                  getColorClass(card.tags, tag),
                )}
              >
                {tag}
              </div>
            </li>
          ))}
        </ul>
        <div className={cx('card-body-profile')}>
          <div className={cx('card-body-profile-date')}>
            <img src={IconCalendar} className={cx('arrow')} alt='rightArrow' />
            <p>{formatDate(card.createdAt)}</p>
          </div>
          <Profile user={card.assignee} />
        </div>
      </div>
    </div>
  );
};

export default Card;
