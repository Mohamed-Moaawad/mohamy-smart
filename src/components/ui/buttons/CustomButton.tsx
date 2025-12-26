import './Buttons.css';
import { Button } from "@heroui/react";


type TCustomButton = {
    type: 'submit' | 'button' | 'reset';
    text: string;
    radius: 'sm' | 'none' | 'md' | 'lg' | 'full';
    // variant: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';
    variant?: 'solid' | 'flat' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    isLoading?: boolean;
    isDisabled?: boolean;

    onClick?: () => void;
}

const CustomButton = ({ type, text = 'العنوان', radius, variant, size, startContent, endContent, color = 'primary', isDisabled, isLoading, onClick }: TCustomButton) => {
    return (
        <Button className={`custom-button`}
            // style={{ backgroundColor: color, color: color === 'var(--white-color)' ? 'var(--title-color)' : '#fff' }}
            color={color}
            type={type}
            radius={radius}
            variant={variant}
            size={size}
            startContent={startContent}
            endContent={endContent}
            isLoading={isLoading}
            isDisabled={isDisabled}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default CustomButton;