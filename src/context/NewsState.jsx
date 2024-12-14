import React, { useState } from 'react';
import NewsContext from './NewsContext';

const NewsState = (props) => {
  const [news, setNews] = useState('');

  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
