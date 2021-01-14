import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  position: fixed; 
  left: 0;
  right: 0;
  bottom: 10px;
  .scrollTop {
    width: 100%;
    height: 20px;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
    animation: fadeIn 0.3s;
    transition: opacity 0.4s;
    opacity: 0.5;
    :hover {
      opacity: 1;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 0.5;
      }
    }
  }
`;

const ScrollArrow = () =>{

  // Track whether the scroll arrow is needed
  const [showScroll, setShowScroll] = useState(null);

  // Check the scroll state, re-memoize when scroll state changes.
  const checkScrollTop = useCallback(
    () => {
      const headerHeight = 400;

      if (!showScroll && window.pageYOffset > headerHeight) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= headerHeight) {
        setShowScroll(false);
      }
    },
    [showScroll],
  );

  // Add/remove the event listener when the component is unmounted or the scroll state has changed.
  useEffect(() => {
      window.addEventListener('scroll', checkScrollTop);
      return () => window.removeEventListener('scroll', checkScrollTop);
    }, [checkScrollTop]);

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <ScrollContainer>
      <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
    </ScrollContainer>
  );
};

export default ScrollArrow;