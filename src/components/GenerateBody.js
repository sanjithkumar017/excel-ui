import React from 'react';
import CellItem from './CellItem';
import PropTypes from 'prop-types';
import Menu from './Menu';
import { rowMenu, optionToActionMap } from '../config';

const GenerateBody = (props) => {
    const { data, colCount, dispatch } = props;
    const numberOfRows = data.length;

    const handleMenuClick = (menuId, optionId) => {
        dispatch({
            type: optionToActionMap[optionId],
            payload: {
                rowId: menuId,
                optionId,
            },
        });
    };

    const bodyMarkup = new Array(numberOfRows).fill(0).map((ignore1, rowId) => {
        const currentRow = data[rowId];
        const tdMarkup = new Array(colCount).fill(0).map((ignore2, colId) => {
            const dataVal = currentRow[colId];
            return (
                <CellItem
                    key={colId}
                    data={dataVal}
                    rowId={rowId}
                    colId={colId}
                    dispatch={dispatch}
                />
            );
        });
        const serailTd = (
            <td>
                <div className="serialItem">
                    <span>{rowId + 1}</span>{' '}
                    <Menu
                        menuId={rowId}
                        list={rowMenu}
                        onMenuClick={handleMenuClick}
                    />
                </div>
            </td>
        );
        const tdMarkupWithSerial = [serailTd, ...tdMarkup];
        return <tr>{tdMarkupWithSerial}</tr>;
    });
    return bodyMarkup;
};

GenerateBody.propTypes = {
    colCount: PropTypes.number.isRequired,
    data: PropTypes.arrayOf([]).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default GenerateBody;
