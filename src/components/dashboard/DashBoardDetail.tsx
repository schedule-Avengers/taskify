import { data } from '@/constans/columns_mockdata.json';
import { useParams } from 'react-router-dom';
import IconAdd from '@/image/ic_add.svg';
import classNames from 'classnames/bind';
import styles from './DashBoardDetail.module.scss';
import Column from './Column';

const cx = classNames.bind(styles);

const DashBoardDetail: React.FC = () => {
  const { dashboard: dashboardId } = useParams<Record<string, string>>();

  console.log(dashboardId);
  return (
    <div className={cx('main')}>
      <ul className={cx('column')}>
        {data.map((column) => (
          <li key={`key-${column.id}`}>
            <Column column={column} dashboardId={dashboardId} />
          </li>
        ))}
      </ul>
      <button className={cx('add')}>
        새로운 컬럼 추가하기
        <img src={IconAdd} alt='AddIcon' />
      </button>
    </div>
  );
};

export default DashBoardDetail;
