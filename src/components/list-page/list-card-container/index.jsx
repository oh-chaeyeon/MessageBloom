import './ListCardContainer.scss';
import ListCard from '../list-card/index';
import { ArrowButtonLeft, ArrowButtonRight } from '../arrow-button/index';
import useFetchData from '../../../hooks/useFetchData';
import { useState, useEffect } from 'react';
import { getRecipients } from '../../../apis/api';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { DESKTOP_WIDTH } from '../../../utils/windowWidthConstants';

const MAX_LIST_LENGTH = 12;
const LIMIT = 4;
const OFFSET = 0;

import React from 'react';

export default function ListCardContainer({ sortLike }) {
  const [scroll, setScroll] = useState(false);
  const [limit, setLimit] = useState(LIMIT);
  const [offset, setOffset] = useState(OFFSET);
  const windowWidth = useWindowWidth();

  const { data, error } = useFetchData(getRecipients, [limit, offset, sortLike]);

  useEffect(() => {
    updateScroll(windowWidth);
  }, [windowWidth]);

  const updateScroll = (windowWidth) => {
    const isSmallScreen = windowWidth < DESKTOP_WIDTH;
    setScroll(isSmallScreen);
    if (isSmallScreen) {
      setLimit(MAX_LIST_LENGTH);
      setOffset(OFFSET);
    } else {
      setLimit(LIMIT);
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
      <div className='list__best-cards'>
        {data && data.map((card) => <ListCard key={card.id} {...card} />)}
      </div>
    </>
  );
}
