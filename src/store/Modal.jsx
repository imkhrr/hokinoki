import { atom } from "recoil";

const itemModal = atom({
    key: "itemModal",
    default: {
        title: 'Item Modal',
        size: 'xs',
        show: false,
        formData: [],
        update: false
    },
});

const userModal = atom({
    key: "userModal",
    default: {
        title: 'User Modal',
        size: 'xs',
        show: false,
        formData: [],
        update: false
    },
});

const customerModal = atom({
    key: "customerModal",
    default: {
        title: 'Customers Modal',
        size: 'xs',
        show: false,
        formData: [],
        update: false,
        eventSuccess: false
    },
});

export { itemModal, userModal, customerModal };
