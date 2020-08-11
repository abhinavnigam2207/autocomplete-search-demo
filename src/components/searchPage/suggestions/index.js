import React from 'react';
import './style.css';

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
            onMouseOver={()=>{setHover({hoveredItem: id});}}
          >
            <div className="bold">{item.id}</div>
            <div className="italics pad025">{item.name}</div>
            {item.items.filter((k)=>~k.toLowerCase().indexOf(searchQuery)).length > 0 && (<div><ul><li>{`"${searchQuery}" found in items`}</li></ul></div>)}
            <div className="pad025">{item.address}</div>
          </div>
        ))}
      </div>
    </div>
  )
};



