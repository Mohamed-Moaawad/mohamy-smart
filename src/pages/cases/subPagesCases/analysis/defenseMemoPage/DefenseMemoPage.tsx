import './DefenseMemoPage.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Stepper } from '@mantine/core';
import Container from "../../../../../components/ui/Container";
import HeadTitle from "../../../../../components/headTitle/HeadTitle";
import FactsReview from './FactsReview';
import LegalAnalysis from './LegalAnalysis';
import DefensesList from './DefensesList';
import FinalRequirements from './FinalRequirements​';
import FinalNote from './FinalNote';

const DefenseMemoPage = () => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 6 ? current + 1 : current));
    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const { state, pathname } = useLocation();
    const facts = state;
    const parts = pathname.split('/');
    const caseId = parts[2];

    const [finalFacts, setFinalFacts] = useState<string>('');
    const [defensesWithDetailsList, setDefensesWithDetailsList] = useState<{
        title: string;
        detailsText: string;
    }[]>([]);
    const [pdf, setPdf] = useState<string>('');

    return (
        <section className="defense-memo">
            <Container>
                <HeadTitle title="التحليل الذكي" />

                <div className="w-full py-4">
                    <Stepper active={active}
                        onStepClick={(step) => {
                            if (step <= active) {
                                setActive(step);
                            }
                        }}
                    >
                        <Stepper.Step label="مراجعة الوقائع" >
                            <FactsReview facts={facts} nextStep={nextStep} setFinalFacts={setFinalFacts} caseId={caseId} />
                        </Stepper.Step>
                        <Stepper.Step label="التحليل القانوني" >
                            <LegalAnalysis finalFacts={finalFacts} nextStep={nextStep} caseId={caseId} />
                        </Stepper.Step>
                        <Stepper.Step label="قائمة الدفوع">
                            <DefensesList caseId={caseId} finalFacts={finalFacts} nextStep={nextStep} setDefensesWithDetailsList={setDefensesWithDetailsList} />
                        </Stepper.Step>
                        <Stepper.Step label="الطلبات الختامية">
                            <FinalRequirements caseId={caseId} finalFacts={finalFacts} nextStep={nextStep} defensesWithDetailsList={defensesWithDetailsList} setPdf={setPdf} />
                        </Stepper.Step>
                        <Stepper.Step label="المذكرة النهائية">
                            <FinalNote pdf={pdf} />
                        </Stepper.Step>
                        <Stepper.Step label="المناقشة القانونية">
                            Step 6 content: Get full access
                        </Stepper.Step>
                        <Stepper.Completed>
                            Completed, click back button to get to previous step
                        </Stepper.Completed>
                    </Stepper>
                </div>
            </Container>
        </section>
    );
};

export default DefenseMemoPage;