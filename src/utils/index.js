import { charArr } from '../config';
export const getColName = (colNumber) => {
    let result = '';
    while (colNumber > 0) {
        if (colNumber > 26) {
            result = result + charArr[0];
            colNumber = colNumber - 26;
        } else {
            result = result + charArr[colNumber - 1];
            colNumber = 0;
        }
    }
    return result;
};

export const getColNumber = (colName) => {
    let result = 0;
    for (let i = 0; i < colName.length; i++) {
        result = colName[i].charCodeAt() - 64 + result * 26;
    }
    return result - 1;
};

export const createMatrix = (rows, cols) => {
    const result = [];
    for (let i = 0; i < rows; i++) {
        result.push(new Array(cols));
        //result.push(new Array(cols).fill(parseInt(Math.random() * 20)));
    }
    return result;
};

export const splitArr = (arr, breakAt) => {
    const firstHalf = arr.slice(0, breakAt);
    const secondHalf = arr.slice(breakAt);
    return [firstHalf, secondHalf];
};

export const rangeValidator = (rowCount, colCount, start, end) => {
    if (
        start.rowId >= 0 &&
        start.rowId <= rowCount &&
        end.rowId >= 0 &&
        end.rowId <= rowCount &&
        start.colId >= 0 &&
        start.colId <= colCount &&
        end.colId >= 0 &&
        end.colId <= colCount
    ) {
        return true;
    } else {
        return false;
    }
};

export const insertMatrix = (matrix, rowId, colId, data) => {
    //slice the front of the array
    //slice the back of the array
    //do operations on the main arr
    //put them back together
    const firstHalf = matrix.slice(0, rowId);
    const secondHalf = matrix.slice(rowId + 1);
    const currentRow = matrix[rowId];
    currentRow[colId] = data;
    const updatedMatrix = [...firstHalf, [...currentRow], ...secondHalf];
    return updatedMatrix;
};

export const getSelectedArr = (matrix, start, end) => {
    const targetArr = [];
    if (start.colId === end.colId && start.rowId !== end.rowId) {
        //calculate result vertically
        for (let i = start.rowId; i <= end.rowId; i++) {
            targetArr.push(matrix[i][start.colId]);
        }
    } else if (start.rowId === end.rowId && start.colId !== end.colId) {
        //calculate result horizontally
        for (let i = start.colId; i <= end.colId; i++) {
            targetArr.push(matrix[start.rowId][i]);
        }
    }
    return targetArr;
};
