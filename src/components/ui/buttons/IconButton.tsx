import './Buttons.css';
import { Button } from "@heroui/react";

type TIconButton = {
    icon: React.ReactNode;
    radius: 'sm' | 'none' | 'md' | 'lg' | 'full';
    size: 'sm' | 'md' | 'lg';
    onclick: () => void;
    backgroundColor: React.CSSProperties['backgroundColor'];
}

const IconButton = ({ icon, radius, size, onclick, backgroundColor }: TIconButton) => {
    return (
        <Button className={`icon-button ${size}`} isIconOnly aria-label="Like" radius={radius}
            style={{ backgroundColor: backgroundColor }}
            onClick={onclick}
        >
            {icon}
        </Button>
    );
};

export default IconButton;