import React from 'react';

export default (text, highlight) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span> 
      {parts.map((part, i) => 
      <span
        key={i}
        style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#75A7EA' } : {}}
      >
        {part}
      </span>)}
    </span>
  );
}