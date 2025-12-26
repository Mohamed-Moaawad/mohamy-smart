import './NotFound.css';
const NotFoundImage = ({ text }: { text: string }) => {
    return (
        <div className="not-found-image flex flex-col justify-center items-center py-8">
            <img src="/images/case_warning_2.svg" alt="warning-image" />
            <p className='not-found mt-8'>{text}</p>
        </div>
    );
};

export default NotFoundImage;