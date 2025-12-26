import Container from "../../components/ui/Container";
import HeadTitle from "../../components/headTitle/HeadTitle";
import { Tab, Tabs } from "@heroui/react";

import CaseDetailsComponent from "./subPagesCases/CaseDetailsComponent";
import CaseAnalysis from "./subPagesCases/CaseAnalysis";
import CaseSummary from "./subPagesCases/CaseSummary";
import thunkGetSingleCase from "../../redux/cases/thunk/thunkGetSingleCase";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const CaseDetails = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { singleCase, loading } = useAppSelector((state) => state.cases);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetSingleCase({ id }))
        }
    }, [dispatch, id])

    return (
        <div className="case-details">
            <Container>
                <HeadTitle title="إدارة القضايا" />
                {loading === 'pending' && (
                    <p>loading...</p>
                )}
                {singleCase && id && (
                    <div className="mt-8">
                        <Tabs aria-label="Tabs variants" variant={'underlined'} color="primary">
                            <Tab key="1" title="التفاصيل" >
                                <CaseDetailsComponent singleCase={singleCase} />
                            </Tab>
                            <Tab key="2" title="التحليل القنوني">
                                <CaseAnalysis caseId={id} facts={singleCase.facts} />
                            </Tab>
                            <Tab key="3" title="ملخص الذكي القضية">
                                <CaseSummary />
                            </Tab>
                        </Tabs>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default CaseDetails