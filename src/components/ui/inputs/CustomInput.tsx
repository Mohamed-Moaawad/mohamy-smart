import './Inputs.css';
import { Input } from '@heroui/react';

type TCustomInput = {
    type: 'text' | 'email' | 'tel' | 'number' | 'file' | 'radio';
    label: string;
    placeholder?: string;
    startContent?: React.ReactNode;
    errorMessage?: string;
    isInvalid?: boolean;
    readOnly?: boolean;
    value?: string
}

const CustomInput = ({ type, label, placeholder, startContent, errorMessage, isInvalid, value, readOnly, ...rest }: TCustomInput) => {
    if (readOnly) {
        return (
            <Input
                className='custom-input'
                type={type}
                label={label}
                placeholder={placeholder}
                startContent={startContent}
                value={value}
                readOnly
            />
        )
    }
    return (
        <Input
            className='custom-input'
            type={type}
            label={label}
            placeholder={placeholder}
            startContent={startContent}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            {...rest}
        />
    );
};

export default CustomInput;