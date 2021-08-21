import React, { useState, useEffect } from 'react';
import {
    ACTION_TYPES,
    formulaRegex,
    cellRegex,
    supportedForumulas,
    formulaToActionMap,
} from '../config';
import { getColNumber } from '../utils';
import PropTypes from 'prop-types';

const CellItem = (props) => {
    const { dispatch, data = '', rowId, colId, selectedCell } = props;
    const [value, setValue] = useState(data);

    useEffect(() => {
        setValue(data);
    }, [data]);

    const handleChange = (event) => {
        //detect if it is a formula or a value
        //call appropriate action
        const insertedValue = event.target.value;
        if (isNaN(insertedValue) && insertedValue.startsWith('=')) {
            const formulaBreakup = formulaRegex.exec(insertedValue);
            if (formulaBreakup) {
                const [ignore, formulaType, start, end] = formulaBreakup;

                //check if formulaType is valid
                if (supportedForumulas.indexOf(formulaType) > -1) {
                    //get start and end values
                    const startBreakup = cellRegex.exec(start);
                    let ignore2;
                    let startRow;
                    let startColName;
                    if (startBreakup) {
                        [ignore2, startColName, startRow] = startBreakup;
                    }

                    const endBreakup = cellRegex.exec(end);
                    let endRow;
                    let endColName;
                    if (endBreakup) {
                        [ignore2, endColName, endRow] = endBreakup;
                    }

                    //call the action
                    dispatch({
                        type: formulaToActionMap[formulaType],
                        payload: {
                            start: {
                                colId: getColNumber(startColName),
                                rowId: parseInt(startRow) - 1,
                            },
                            end: {
                                colId: getColNumber(endColName),
                                rowId: parseInt(endRow) - 1,
                            },
                            location: { rowId, colId },
                        },
                    });
                } else {
                    console.error('formula not supported');
                }
            }
        } else {
            dispatch({
                type: ACTION_TYPES.INSERT_VALUE,
                payload: { data: insertedValue, location: { rowId, colId } },
            });
        }
        setValue(insertedValue);
    };

    let activeClass = '';
    if (selectedCell.length === 2) {
        const [selectedRowId, selectedColId] = selectedCell;
        if (selectedRowId === rowId && selectedColId === colId) {
            activeClass = 'selected';
        }
    }
    return (
        <td className={`cellItem-container ${activeClass}`}>
            <input
                value={value}
                className="cellItem-input"
                onChange={handleChange}
            />
        </td>
    );
};

CellItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.number.isRequired,
    rowId: PropTypes.number.isRequired,
    colId: PropTypes.number.isRequired,
    selectedCell: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CellItem;
