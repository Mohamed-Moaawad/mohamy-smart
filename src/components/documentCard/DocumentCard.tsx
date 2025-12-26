import './DocumentCard.css';
import { useNavigate } from 'react-router-dom';

type TDocumentCard = {
    img: string;
    title: string;
    text: string;
    stepCount: string | number;
    link: string;
    facts?: string;
}

const DocumentCard = ({ img, title, text, stepCount, link, facts }: TDocumentCard) => {
    const navigate = useNavigate();
    return (
        <section className="document-card"
            onClick={() => navigate(link, {
                state: facts,
            })}
        >
            <div className="flex gap-4">
                <div className="img">
                    <img src={img} alt="icon" />
                </div>
                <div className="text">
                    <h4>{title}</h4>
                    <p>
                        {text}
                    </p>
                </div>
            </div>
            <span>{stepCount} خطوات</span>
        </section>
    );
};

export default DocumentCard;