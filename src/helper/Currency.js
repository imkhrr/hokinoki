function Currency(value, slice = []) {
    const curr = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    });

    return curr.format(value).slice(slice[0], slice[1])
}

export default Currency