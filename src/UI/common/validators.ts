export const requiredField = (val: any) => {
    return val
        ? undefined
        : "line is required"
}

const maxLength = (max: any) => {
    return (value: any) => value && value.length > max ? `Must be ${max} characters or less` : undefined
}

export const maxLength10 = maxLength(10)
export const maxLength25 = maxLength(25)

export const email = (value: any) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined