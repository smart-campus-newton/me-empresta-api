const getItems = (items) => {
    return items.map((item) => {
        const obj = {
            _links: {
                self: { href: `/api/courses/${item.code}` }
            },
            _id: item._id,
            code: item.code,
            name: item.name
        }
        return obj
    })
}

const list = (items) => {
    return getItems(items)
}

const one = (item) => {
    return {
        _links: {
            self: { href: `/api/courses/${item.code}` }
        },
        _id: item._id,
        code: item.code,
        name: item.name
    }
}

module.exports = {
    one,
    list
}
