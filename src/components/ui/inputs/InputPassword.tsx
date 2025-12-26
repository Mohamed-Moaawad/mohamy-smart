import { useState } from "react";
import { Input } from "@heroui/react";


import { RxEyeClosed } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";


type TInputPassword = {
    label: string;
    placeholder?: string;
    isInvalid: boolean;
    errorMessage?: string;
}

const InputPassword = ({ label, isInvalid, errorMessage, placeholder, ...rest }: TInputPassword) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            type={isVisible ? "text" : "password"}
            label={label}
            placeholder={placeholder}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            {...rest}

            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-solid outline-transparent cursor-pointer"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <RxEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
        />
    )
}

export default InputPassword