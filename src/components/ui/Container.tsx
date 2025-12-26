type TContainer = {
    children: React.ReactNode;
};

const Container = ({ children }: TContainer) => {
    return (
        <div className="py-4 px-4 sm:px-10 ">
            {children}
        </div>
    );
};

export default Container;