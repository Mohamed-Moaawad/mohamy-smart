// import React from 'react'

import { Select, SelectItem } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";


type TInputSelect = {
    label: string;
    data: string[];
    radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    value?: string;
    onChange?: () => void;
    name?: string;
    isDisabled?: boolean
}

const InputSelect = ({ label = 'العنوان', data, radius, value, isDisabled, onChange, name }: TInputSelect) => {
    const form = useFormContext();
    if (name && form && form.control) {
        return (
            <Controller
                name={name}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Select className="w-full" label={label}
                        size="sm"
                        radius={radius}
                        selectedKeys={field.value ? [field.value] : []}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            field.onChange(value);
                        }}
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                    >
                        {data.map((item) => (
                            <SelectItem key={item}>{item}</SelectItem>
                        ))}
                    </Select>
                )}
            />
        );
    };
    return (
        <Select className="w-full" label={label}
            size="sm"
            radius={radius}
            value={value}
            onChange={onChange}
            isDisabled={isDisabled}
        >
            {data.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
            ))}
        </Select>
    );
};

export default InputSelect;