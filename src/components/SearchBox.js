import React, { useRef } from 'react';
import { ACTION_TYPES } from '../config';
import PropTypes from 'prop-types';

const SearchBox = (props) => {
    const { dispatch } = props;
    const inputRef = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        // call dispatch with appropriate query
        dispatch({
            type: ACTION_TYPES.SEARCH,
            payload: {
                query: inputRef.current.value,
            },
        });
    };
    return (
        <form onSubmit={handleSubmit} className="searchBox-container">
            <input ref={inputRef} />
            <button type="submit">Search</button>
        </form>
    );
};

SearchBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
export default SearchBox;
