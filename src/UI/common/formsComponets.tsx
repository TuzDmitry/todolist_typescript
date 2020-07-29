import React from "react";


const FormControl = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error
    let formElStyle = hasError ? "wrapInp error" : "wrapInp"
    let formWarningStyle = {color: hasError ? "red" : "black"}
    return (
        <div className={ `${formElStyle}`}>
            {props.children}
            {hasError && <div style={formWarningStyle}>{meta.error}</div>}
        </div>

    )
}

export let Input = (props: any) => {

    let {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input}{...restProps}/>
        </FormControl>
    )
}

