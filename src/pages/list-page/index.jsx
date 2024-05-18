import './List.scss';
import ListCardContainer from '../../components/list-page/list-card-container/index';
import { Link } from 'react-router-dom';
import star_emoji from '../../assets/image/list/star_emoji.png';
import fire_emoji from '../../assets/image/list/fire_emoji.png';

export default function List() {
  return (
    <div className='list'>
      <div className='list__best'>
        <p className='list__best-title'>
          인기 롤링 페이퍼
          <img className='list__icon' src={fire_emoji} />
        </p>
        <ListCardContainer sortLike='like' />
      </div>

      <div className='list__newest'>
        <p className='list__newest-title'>
          최근에 만든 롤링 페이퍼
          <img className='list__icon' src={star_emoji} />
        </p>
        <ListCardContainer sortLike='' />
      </div>
      <div className='list__create-btn__wrap'>
        <Link to='/post'>
          <button className='list__create-btn'>나도 만들어보기</button>
        </Link>
      </div>
    </div>
  );
}
