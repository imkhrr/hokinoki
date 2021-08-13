import { atom } from "recoil";

const itemsTable = atom({
    key: "itemsTable",
    default: [],
});
const usersTable = atom({
    key: "usersTable",
    default: [],
});
const customersTable = atom({
    key: "customersTable",
    default: [],
});

const transTable = atom({
    key: "transTable",
    default: [],
});

const sellReportTable = atom({
    key: "sellReportTable",
    default: [],
});

export { itemsTable, usersTable, customersTable, transTable, sellReportTable };
