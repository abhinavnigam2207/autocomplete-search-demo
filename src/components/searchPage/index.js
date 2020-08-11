import React, { useReducer, useEffect } from 'react';
import { getUsers } from '../../services/users';
import { filterData as searchUsers } from '../../utils/filter';
import Input from '../commons/input';
import Suggestion from './suggestions';
import NoUser from './noUserFound';
import ClearSearch from '../commons/closeButton';
import _ from "lodash";
import './style.css';

const initialState = {
  users: [],
  searchQuery: '',
  searchedUsers: [],
  hoveredItem: -1
};

export default () => {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), initialState);

  const delayedFilter = _.debounce(q => {
    const filteredUsers = searchUsers(state.users, q);
    setState({searchedUsers: filteredUsers});
  }, 500);

  const reset = () => { setState({searchQuery: '', searchedUsers: [], hoveredItem: -1}); }

  const onChangeHandler = ({ currentTarget: { value } }) => {
    if (value.length) {
      setState({searchQuery: value, hoveredItem: -1});
      delayedFilter(value);
    } else {
      reset();
    }
  };

  const moveDown = () => {
    if(state.hoveredItem < state.searchedUsers.length-1) { setState({hoveredItem: state.hoveredItem+1}); }
    else if(state.hoveredItem === state.searchedUsers.length-1) { setState({hoveredItem: 0}); }
  }

  const moveUp = () => {
    if(state.hoveredItem > 0) { setState({hoveredItem: state.hoveredItem-1}); } 
    else if(state.hoveredItem === 0) { setState({hoveredItem: state.searchedUsers.length-1}); } 
  }

  const onKeyDownHandler = ({ keyCode }) => {
    keyCode===40 && moveDown();
    keyCode===38 && moveUp();
    if (keyCode===13) {
      const i = state.hoveredItem > -1 ? state.hoveredItem : 0;
      setState({
        searchQuery: state.searchedUsers[i].name,
        searchedUsers: [],
        hoveredItem: -1
      });
    }
  }

  useEffect(() => {
    const currentItem = document.getElementById(`suggestion${state.hoveredItem}`);
    currentItem && currentItem.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    return () => {}
  }, [state.hoveredItem])
  
  useEffect(() => {
    (async () => {
      try {
        const resp = await getUsers();
        setState({users: resp});
      } catch (error) {
        console.error(error);
      }
    })();
  }, [])
  
  return (
    <>
      <ClearSearch visible={state.searchQuery.length>0} onClickHandler={reset} />
      <main className="container">
        <Input searchQuery={state.searchQuery} onChange={onChangeHandler} onKeyDown={(e) => onKeyDownHandler(e)} />
        {state.searchedUsers.length > 0 && (<Suggestion state={state} setHover={setState} />)}
        {(state.searchQuery.length>0 && state.searchedUsers.length<1) && (<NoUser />)}
      </main>
    </>
  )
};
