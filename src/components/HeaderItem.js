import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import { getColName } from '../utils';
import { columnMenu, optionToActionMap } from '../config';

const HeaderItem = (props) => {
    const { colNumber, onMenuClick } = props;
    // generate the col name
    const colName = getColName(colNumber);

    const handleMenuClick = (menuId, optionId) => {
        onMenuClick({
            type: optionToActionMap[optionId],
            payload: { colId: menuId, optionId },
        });
    };

    return (
        <th>
            <div className="headerItem">
                <span>{colName}</span>
                <Menu
                    menuId={colNumber}
                    list={columnMenu}
                    onMenuClick={handleMenuClick}
                />
            </div>
        </th>
    );
};

HeaderItem.propTypes = {
    colNumber: PropTypes.number.isRequired,
    onMenuClick: PropTypes.func.isRequired,
};

export default HeaderItem;
