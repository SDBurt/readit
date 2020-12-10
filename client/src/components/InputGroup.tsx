import { useState } from 'react'
import classNames from 'classnames'

interface InputGroupProps {
    className ?: string,
    type: string,
    placeholder: string,
    value: string,
    error: string | undefined,
    setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({
    className, type, placeholder, value, error, setValue
}) => {

    return (
        <div className={className}>
            <input 
                type={type}
                className={
                    classNames('w-full p-3 transition duration-200 border rounded outline-none bg-grey-100 border-grey-300 focus:bg-white hover:bg-white', {'border-red-500': error})
                }
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            {error ? <small className="font-medium text-red-600">{error}</small> : null}
        </div>
    )
}

export default InputGroup
 

