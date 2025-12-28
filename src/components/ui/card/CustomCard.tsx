import './Card.css';


type TCustomCard = {
    children: React.ReactNode,
    className?: string;
    onClick?: () => void;
}

const CustomCard = ({ children, className, onClick }: TCustomCard) => {
    return (
        <div className={`custom-card p-5 ${className}`}
            onClick={onClick}>
            {children}
        </div>
    );
};

export default CustomCard;