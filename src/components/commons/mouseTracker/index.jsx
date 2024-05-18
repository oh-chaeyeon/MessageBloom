import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';

export default function MouseTracker({ text, imgUrl, children, alpha = 0.8 }) {
  const targetRef = useRef(null);
  const imageRef = useRef(null);

  const lerp = (start, end, alpha) => {
    return start * (1 - alpha) + end * alpha;
  };

  const handleMove = throttle((e) => {
    const rect = targetRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    imageRef.current.style.left = `${lerp(parseFloat(imageRef.current.style.left), x, alpha)}px`;
    imageRef.current.style.top = `${lerp(parseFloat(imageRef.current.style.top), y, alpha)}px`;
  }, 100);

  useEffect(() => {
    const targetEl = targetRef.current;
    targetEl.addEventListener('mousemove', handleMove);

    return () => {
      targetEl.removeEventListener('mousemove', handleMove);
      handleMove.cancel();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={targetRef}>
      {children}
      <div
        className='track-Img'
        ref={imageRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 9999,
          left: 0,
          top: -100,
          backgroundImage: `url(${imgUrl})`,
        }}>
        {text}
      </div>
    </div>
  );
}
