import { atom } from "recoil";

const Cart = atom({
    key: "Cart",
    default: []
});

const Page = atom({
    key: "Page",
    default: 0
});

const CheckoutSave = atom({
    key: "Checkout",
    default: []
});

const Storehouse = atom({
    key: "Storehouse",
    default: {
        type: '',
        data: [],
    }
})
export { Cart, CheckoutSave, Page, Storehouse };
