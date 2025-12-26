import '../CasesComponents.css';
import HeadTitle from "../../../../components/headTitle/HeadTitle";
import Container from "../../../../components/ui/Container";
import DocumentCard from '../../../../components/documentCard/DocumentCard';
import analysis_1 from '../../../../../public/images/analysis_1.png';
import analysis_2 from '../../../../../public/images/analysis_2.png';
import analysis_3 from '../../../../../public/images/analysis_3.png';
import { useLocation } from 'react-router-dom';




const DocumentSelection = () => {
    const { pathname, state } = useLocation();
    const facts = state;

    const legalAnalysisOptions = [
        {
            img: analysis_1,
            title: "إعداد مذكرة دفاع",
            text: "إنشاء مذكرة دفاع شاملة مع الدفوع الشكلية والموضوعية.",
            stepCount: 8,
            link: "defense-memo",
        },
        {
            img: analysis_2,
            title: "مراجعة الوقائع فقط",
            text: "مراجعة وتصحيح وقائع القضية مع الملاحظات القانونية.",
            stepCount: 4,
            link: "facts-review",
        },
        {
            img: analysis_3,
            title: "تحليل قانوني ذكي شامل",
            text: "تحليل متكامل للقضية مع جميع المراحل من الوقائع إلى المذكرة النهائية.",
            stepCount: 8,
            link: "smart-legal-analysis",
        },
        {
            img: analysis_1,
            title: "طعن بالنقض",
            text: "إعداد طعن بالنقض مع تحديد أوجه الخطأ في الحكم.",
            stepCount: 5,
            link: "cassation-appeal",
        },
        {
            img: analysis_2,
            title: "صحيفة دعوى",
            text: "إنشاء صحيفة دعوى كاملة مع جميع البيانات المطلوبة.",
            stepCount: 5,
            link: "lawsuit-file",
        },
        {
            img: analysis_3,
            title: "مذكرة استئناف",
            text: "إعداد مذكرة استئناف مفصلة مع أسباب الطعن.",
            stepCount: 4,
            link: "appeal-memo",
        },
        {
            img: analysis_1,
            title: "مناقشة قانونية حول مسألة محددة",
            text: "مناقشة تفاعلية حول نقطة قانونية محددة.",
            stepCount: 4,
            link: "legal-discussion",
        },
        {
            img: analysis_2,
            title: "صيغة قانونية عامة",
            text: "إنشاء صيغ قانونية متنوعة حسب الحاجة.",
            stepCount: 4,
            link: "legal-template",
        },
        {
            img: analysis_3,
            title: "صياغة إنذار أو طلب",
            text: "إنشاء إنذارات قانونية أو طلبات رسمية.",
            stepCount: 4,
            link: "legal-notice",
        },
    ];

    return (
        <section className="document-selection">
            <Container>
                <HeadTitle title="إدارة المستندات" />
                <div className="title mb-8">
                    <h3>التحليل القانوني الذكي</h3>
                    <p>اختر نوع التحليل المطلوب للاستفادة من قوة الذكاء الاصطناعي في التحليل القانوني</p>
                </div>

                <div className="flex flex-wrap">
                    {legalAnalysisOptions.map((option) => (
                        <div key={option.text} className="w-full sm:w-6/12 lg:w-4/12  p-4">
                            <DocumentCard
                                img={option.img}
                                title={option.title}
                                text={option.text}
                                stepCount={option.stepCount}
                                link={`${pathname}/${option.link}`}
                                facts={facts}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default DocumentSelection;