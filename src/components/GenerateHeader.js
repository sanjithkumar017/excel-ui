import React from 'react';
import HeaderItem from './HeaderItem';
import PropTypes from 'prop-types';

const GenerateHeader = (props) => {
    const { colCount, dispatch } = props;

    const headerMarkup = new Array(colCount).fill(0).map((ignore, idx) => {
        const colNumber = idx + 1;
        return (
            <HeaderItem
                key={idx}
                colNumber={colNumber}
                onMenuClick={dispatch}
            />
        );
    });

    return [<th></th>, ...headerMarkup];
};

GenerateHeader.propTypes = {
    colCount: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default GenerateHeader;
