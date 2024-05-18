import './ListCardContainer.scss';
import { useState, useEffect } from 'react';
import useFetchData from '../../../hooks/useFetchData';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { getRecipients } from '../../../apis/api';
import { DESKTOP_WIDTH } from '../../../utils/windowWidthConstants';
import { constants } from '../../../utils/constants';
import { ArrowButtonLeft, ArrowButtonRight } from '../arrow-button/index';
import ListCard from '../list-card/index';

export default function ListCardContainer({ sortLike }) {
  const [scroll, setScroll] = useState(false);
  const [limit, setLimit] = useState(constants.LIMIT);
  const [offset, setOffset] = useState(constants.OFFSET);
  const windowWidth = useWindowWidth();

  const { data, error } = useFetchData(getRecipients, [limit, offset, sortLike]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth === 1200) {
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateScroll(windowWidth);
  }, [windowWidth]);

  const updateScroll = (windowWidth) => {
    const isSmallScreen = windowWidth < DESKTOP_WIDTH;
    setScroll(isSmallScreen);
    if (isSmallScreen) {
      setLimit(constants.MAX_LIST_LENGTH);
      setOffset(constants.OFFSET);
    } else {
      setLimit(constants.LIMIT);
    }
  };

  const handlePrevious = () => {
    setOffset(offset - 1);
  };

  const handleNext = () => {
    setOffset(offset + 1);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {!scroll && offset > 0 && <ArrowButtonLeft onClick={handlePrevious} />}
      {!scroll && offset < 12 && <ArrowButtonRight onClick={handleNext} />}
      <div className='list-cards-container'>
        {data &&
          data.map((card) => {
            return <ListCard key={card.id} {...card} />;
          })}
      </div>
    </>
  );
}
