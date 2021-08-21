export const NUM_ROWS = 50;
export const NUM_COLS = 50;

const charNumArr = Array.from(new Array(26).fill(0)).map(
    (ignore, idx) => idx + 65
);
export const charArr = charNumArr.map((charNum) =>
    String.fromCharCode(charNum)
);

export const ACTION_TYPES = {
    INSERT_VALUE: 'INSERT_VALUE',
    SORT_COLUMN: 'SORT_COLUMN',
    ADD_COLUMN: 'ADD_COLUMN',
    DELETE_COLUMN: 'DELETE_COLUMN',
    ADD_ROW: 'ADD_ROW',
    DELETE_ROW: 'DELETE_ROW',
    FORMULA_ADD: 'FORMULA_ADD',
    FORMULA_SUBTRACTION: 'FORMULA_SUBTRACTION',
    FORMULA_MULTIPLICATION: 'FORMULA_MULTIPLICATION',
};

export const columnMenu = [
    {
        label: 'Sort A-Z',
        id: 'asc',
    },
    {
        label: 'Sort Z-A',
        id: 'desc',
    },
    {
        label: 'Insert 1 Left',
        id: 'insert_left',
    },
    {
        label: 'Insert 1 Right',
        id: 'insert_right',
    },
    {
        label: 'Delete',
        id: 'delete_column',
    },
];

export const rowMenu = [
    {
        label: 'Insert 1 Above',
        id: 'insert_above',
    },
    {
        label: 'Insert 1 Below',
        id: 'insert_below',
    },
    {
        label: 'Delete',
        id: 'delete_row',
    },
];

export const optionToActionMap = {
    asc: 'SORT_COLUMN',
    desc: 'SORT_COLUMN',
    insert_left: 'ADD_COLUMN',
    insert_right: 'ADD_COLUMN',
    delete_column: 'DELETE_COLUMN',
    insert_above: 'ADD_ROW',
    insert_below: 'ADD_ROW',
    delete_row: 'DELETE_ROW',
};

export const formulaRegex = /=([A-Z\s]+)\(([A-Z/s]+[0-9]+):([A-Z/s]+[0-9]+)\)/;
export const cellRegex = /([A-Z/s]+)([0-9]+)/;

export const supportedForumulas = ['SUM', 'SUBTRACTION', 'MULTIPLICATION'];

export const formulaToActionMap = {
    SUM: 'FORMULA_ADD',
    SUBTRACTION: 'FORMULA_SUBTRACTION',
    MULTIPLICATION: 'FORMULA_MULTIPLICATION',
};
