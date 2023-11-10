import React, { forwardRef } from 'react';
import { ForwardedRef } from 'react';

const Input=forwardRef(function Input({
    type="text",
    className,
    placeholder,
    ...props
},ref){
   return <input type={type} placeholder={placeholder} className={className} />
})

export default Input;
