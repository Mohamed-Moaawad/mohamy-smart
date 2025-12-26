import './CasesComponents.css';
import { Link } from 'react-router-dom';

const CaseAnalysis = ({ caseId,facts }: { caseId: string; facts: string; }) => {
    console.log('analysis');
    return (
        <div className='case-analysis'>
            <div className="flex justify-center mt-10">
                <div className="start-analysis-box p-4">
                    <img src="/images/ai-icon.png" alt="icon" />
                    <h2>ابدأ تحليلاً قانونياً متقدماً</h2>
                    <p>استخدم الذكاء الاصطناعي المتقدم لتحليل شامل للقضية وإنشاء المذكرات القانونية</p>
                    <Link to={`/cases/${caseId}/document-selection`} state={facts}>
                        <img src="/images/ai-icon-white.png" alt="icon" />
                        بدأ التحليل الذكي
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaseAnalysis;