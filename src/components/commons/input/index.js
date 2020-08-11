import React from 'react';
import './style.css';

export default ({ searchQuery, onChange, onKeyDown }) => (
  <div id="searchField">
    <label htmlFor="search">Search Button</label>
    <input
      id="search"
      name="search"
      data-testid="search-input"
      className={"searchInput " + (searchQuery.length ? 'active' : '')}
      autoComplete="off"
      onChange={onChange}
      onKeyDown={onKeyDown}
      aria-label="Search users by ID, address, name, pincode, etc"
      placeholder="Search users by ID, address, name, pincode, etc"
      value={searchQuery}
      autoFocus />
  </div>
);

