export const Enum = (obj) => Object.freeze(obj)

export const ArrayRepeat = (value, count) => {
    const array = []
    for (let i = 0; i < count; i++)
        array.push(value)
    return array
}