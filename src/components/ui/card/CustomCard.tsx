import './Card.css';


const CustomCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`custom-card p-5 ${className}`}>
            {children}
        </div>
    );
};

export default CustomCard;