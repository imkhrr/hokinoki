import { atom } from "recoil";


const CommodityType = atom({
    key: "itemModal",
    default: {
        title: 'Item Modal',
        size: 'xs',
        show: false,
        formData: [],
        update: false,
        eventSuccess: false
    },
});


export { CommodityType };
