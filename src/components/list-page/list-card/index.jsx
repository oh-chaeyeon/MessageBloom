import './ListCard.scss';
import ShowTheMostEmojis from '../show-the-most-emojis';
import { useNavigate } from 'react-router-dom';
import ProfileMessageCounter from '../../commons/ProfileMessageCounter';

export default function ListCard({
  name,
  backgroundColor,
  backgroundImageURL,
  messageCount,
  id,
  recentMessages,
}) {
  const nav = useNavigate();

  const baseColor = backgroundImageURL ? 'white' : '';
  const background = backgroundImageURL ? `url(${backgroundImageURL})` : {};

  const profiles = recentMessages.slice(0, 3).map((message) => message.profileImageURL);

  return (
    <div
      className={`list-card ${`--${backgroundColor}`}`}
      style={{
        backgroundImage: `${background}`,
        color: `${baseColor}`,
      }}
      onClick={() => nav(`/post/${id}`)}>
      <div className='list-card__container'>
        <div className='list-card__writers'>
          <p className='list-card__writers__to'>To.{name}</p>
          <ProfileMessageCounter
            count={messageCount}
            profiles={profiles}
            displayOption={'vertical'}
          />
        </div>
        <div>
          <ShowTheMostEmojis id={id} />
        </div>
      </div>
    </div>
  );
}
