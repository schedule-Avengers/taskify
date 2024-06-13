import { cards } from '@/constans/cards_mockdata.json';
import { ColumnProps } from '@/types/types.ts';
import IconSetting from '@/image/ic_setting.svg';
import IconAdd from '@/image/ic_add.svg';

import classNames from 'classnames/bind';
import styles from './Column.module.scss';
import Card from './Card';

const cx = classNames.bind(styles);

const Column: React.FC<{
  column: ColumnProps;
  dashboardId: string | undefined;
}> = ({ column, dashboardId }) => {
  return (
    <div className={cx('main')}>
      <div className={cx('header')}>
        <div className={cx('title')}>
          <div className={cx('circle')}></div>
          {column.title}
          <div className={cx('count')}>{cards.length}</div>
        </div>
        <div className={cx('settingButton')}>
          <img src={IconSetting} alt='IconSetting' />
        </div>
      </div>
      <button className={cx('button')}>
        <img src={IconAdd} alt='AddIcon' />
      </button>
      <ul className={cx('cards')}>
        {cards.map((card) => (
          <li key={`key-${card.id}`}>
            <Card card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
