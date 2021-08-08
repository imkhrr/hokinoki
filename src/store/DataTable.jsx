import { atom } from "recoil";

const itemsTable = atom({
    key: "itemsTable",
    default: {
        data: [],
    },
});
const usersTable = atom({
    key: "usersTable",
    default: {
        data: [],
    },
});
const customersTable = atom({
    key: "customersTable",
    default: {
        data: [],
    },
});

const transTable = atom({
    key: "transTable",
    default: {
        data: [],
    },
});

const sellReportTable = atom({
    key: "sellReportTable",
    default: {
        data: [],
    },
});

export { itemsTable, usersTable, customersTable, transTable, sellReportTable };
