import React from 'react';
import './style.css';
import highlight from '../../../helpers/highlight';

export default ({state, setHover}) => {
  const { searchedUsers, hoveredItem, searchQuery } = state;
  return(
    <div id="search-autocomplete" className="autocomplete-suggestions">
      <div id="results" role="listbox">
        {searchedUsers.map((item, id)=>(
          <div className={"suggestion " + (hoveredItem === id ? 'active' : '')}
            key={item.id}
            id={`suggestion${id}`}
            role="option"
            aria-selected={hoveredItem === id}
            onMouseMove={()=>{setHover({hoveredItem: id});}}
          >
            <div className="bold">{highlight(item.id, searchQuery)}</div>
            <div className="italics pad025">{highlight(item.name, searchQuery)}</div>
            {item.items.filter((k)=>~k.toLowerCase().indexOf(searchQuery)).length > 0
              && (
                <div>
                  <ul><li>{highlight(`"${searchQuery}" found in items`, searchQuery)}</li></ul>
                </div>
              )}
            <div className="pad025">{highlight(item.address, searchQuery)}</div>
          </div>
        ))}
      </div>
    </div>
  )
};



