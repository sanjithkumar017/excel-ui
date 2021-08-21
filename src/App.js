import React, { useReducer } from 'react';
import GenerateHeader from './components/GenerateHeader';
import GenerateBody from './components/GenerateBody';
import SearchBox from './components/SearchBox';
import { NUM_ROWS, NUM_COLS, ACTION_TYPES } from './config';
import {
    createMatrix,
    splitArr,
    rangeValidator,
    insertMatrix,
    getSelectedArr,
} from './utils';
import '../public/styles/index.css';

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.INSERT_VALUE: {
            const { data, location } = action.payload;
            const { rowId, colId } = location;
            const { matrix } = state;

            const updatedMatrix = insertMatrix(matrix, rowId, colId, data);
            return { ...state, matrix: updatedMatrix };
        }
        case ACTION_TYPES.SORT_COLUMN: {
            const { colId, optionId } = action.payload;
            const { matrix } = state;
            const updatedMatrix = matrix.sort((a, b) => {
                let aValue = a[colId - 1];
                let bValue = b[colId - 1];

                aValue = isNaN(aValue) ? aValue : parseFloat(aValue);
                bValue = isNaN(bValue) ? bValue : parseFloat(bValue);

                if (aValue === undefined || bValue === undefined) {
                    return 0;
                }
                if (optionId === 'asc') {
                    return aValue === bValue ? 0 : aValue > bValue ? 1 : -1;
                } else {
                    return aValue === bValue ? 0 : aValue > bValue ? -1 : 1;
                }
            });
            return { ...state, matrix: updatedMatrix };
        }
        case ACTION_TYPES.ADD_ROW: {
            const { rowId, optionId } = action.payload;
            let breakPoint = rowId;
            if (optionId === 'insert_below') {
                breakPoint = rowId + 1;
            }
            const { matrix, colCount, rowCount } = state;
            const [firstHalf, secondHalf] = splitArr(matrix, breakPoint);
            const updatedMatrix = [
                ...firstHalf,
                new Array(colCount),
                ...secondHalf,
            ];
            return { ...state, rowCount: rowCount + 1, matrix: updatedMatrix };
        }
        case ACTION_TYPES.ADD_COLUMN: {
            const { colId, optionId } = action.payload;
            let breakPoint = colId;
            if (optionId === 'insert_left') {
                breakPoint = colId - 1;
            }
            const { matrix, colCount } = state;
            const updatedMatrix = matrix.map((rowItem) => {
                const [firstHalf, secondHalf] = splitArr(rowItem, breakPoint);
                return [...firstHalf, undefined, ...secondHalf];
            });
            return { ...state, colCount: colCount + 1, matrix: updatedMatrix };
        }
        case ACTION_TYPES.DELETE_COLUMN: {
            const { colId } = action.payload;
            const { matrix, colCount } = state;

            const updatedMatrix = matrix.map((rowItem) => {
                const firstHalf = rowItem.slice(0, colId - 1);
                const secondHalf = rowItem.slice(colId);
                return [...firstHalf, ...secondHalf];
            });
            return { ...state, colCount: colCount - 1, matrix: updatedMatrix };
        }
        case ACTION_TYPES.DELETE_ROW: {
            const { rowId } = action.payload;
            const { matrix, rowCount } = state;

            const updatedMatrix = matrix.filter((rowItem, idx) => {
                return idx !== rowId;
            });
            return { ...state, rowCount: rowCount - 1, matrix: updatedMatrix };
        }
        case ACTION_TYPES.FORMULA_ADD: {
            const { start, end, location } = action.payload;
            const { matrix, rowCount, colCount } = state;
            // check if start and end are in range
            if (rangeValidator(rowCount, colCount, start, end)) {
                const targetArr = getSelectedArr(matrix, start, end);

                const result = targetArr.reduce(
                    (acc, item) => acc + parseFloat(item),
                    0
                );
                const { rowId, colId } = location;
                const updatedMatrix = insertMatrix(
                    matrix,
                    rowId,
                    colId,
                    result
                );
                return { ...state, matrix: updatedMatrix };
            } else {
                console.error('Out of range');
            }
        }
        case ACTION_TYPES.FORMULA_SUBTRACTION: {
            const { start, end, location } = action.payload;
            const { matrix, rowCount, colCount } = state;
            // check if start and end are in range
            if (rangeValidator(rowCount, colCount, start, end)) {
                const targetArr = getSelectedArr(matrix, start, end);

                const result = targetArr.reduce(
                    (acc, item) => acc - parseFloat(item)
                );
                const { rowId, colId } = location;
                const updatedMatrix = insertMatrix(
                    matrix,
                    rowId,
                    colId,
                    result
                );
                return { ...state, matrix: updatedMatrix };
            } else {
                console.error('Out of range');
            }
        }
        case ACTION_TYPES.FORMULA_MULTIPLICATION: {
            const { start, end, location } = action.payload;
            const { matrix, rowCount, colCount } = state;
            // check if start and end are in range
            if (rangeValidator(rowCount, colCount, start, end)) {
                const targetArr = getSelectedArr(matrix, start, end);

                const result = targetArr.reduce(
                    (acc, item) => acc * parseFloat(item)
                );
                const { rowId, colId } = location;
                const updatedMatrix = insertMatrix(
                    matrix,
                    rowId,
                    colId,
                    result
                );
                return { ...state, matrix: updatedMatrix };
            } else {
                console.error('Out of range');
            }
        }
        case ACTION_TYPES.SEARCH: {
            const { query } = action.payload;
            const { matrix } = state;
            let location = [];

            for (let i = 0; i < matrix.length; i++) {
                const colLength = matrix[i].length;
                for (let j = 0; j < colLength; j++) {
                    if (query === matrix[i][j]) {
                        location = [i, j];
                    }
                }
            }
            //highlight section
            return { ...state, selectedCell: location };
        }
        default:
            return state;
    }
};

const App = () => {
    const initialMatrix = createMatrix(NUM_ROWS, NUM_COLS);
    const initialState = {
        rowCount: NUM_ROWS,
        colCount: NUM_COLS,
        matrix: initialMatrix,
        selectedCell: [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleMouseDown = () => {
        console.log('handleMouseDown called ', rowId, colId);
    };

    const { colCount, matrix,selectedCell } = state;
    return (
        <>
            <SearchBox dispatch={dispatch} />
            <table className="content-table">
                <thead>
                    <tr>
                        <GenerateHeader
                            colCount={colCount}
                            dispatch={dispatch}
                            onMouseDown={handleMouseDown}
                        />
                    </tr>
                </thead>
                <tbody>
                    <GenerateBody
                        data={matrix}
                        colCount={colCount}
                        dispatch={dispatch}
                        selectedCell={selectedCell}
                    />
                </tbody>
            </table>
        </>
    );
};

export default App;
