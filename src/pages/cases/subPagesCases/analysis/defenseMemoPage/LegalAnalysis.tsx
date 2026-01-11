import './DefenseMemoPage.css';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline, IoReload } from "react-icons/io5"
import SubTitle from "../../../../../components/subTitle/SubTitle"
import CustomButton from "../../../../../components/ui/buttons/CustomButton"
import CustomCard from "../../../../../components/ui/card/CustomCard"
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import NotFoundImage from '../../../../../components/notFound/NotFoundImage';
import toast from 'react-hot-toast';
import thunkFactAnalysis from '../../../../../redux/analysis/thunk/thunkFactAnalysis';
import thunkGenerateDefenses from '../../../../../redux/analysis/thunk/thunkGenerateDefenses';
import SkeletonCardsList from '../../../../../components/skeleton/SkeletonCardsList';

type TLegalAnalysis = {
    finalFacts: string;
    nextStep: () => void;
    caseId: string;
}


const LegalAnalysis = ({ finalFacts, nextStep, caseId }: TLegalAnalysis) => {

    const dispatch = useAppDispatch();
    const { factAnalysis, loading } = useAppSelector((state) => state.analysis);
    // const [analysisText, setAnalysisText] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const reAnalysis = async () => {
        const loadingToast = toast.loading('جاري إعادة تحليل الوقائع...');
        setIsLoading(true);


        await dispatch(thunkFactAnalysis({ caseId, caseFacts: finalFacts })).unwrap()
            .then(() => {
                toast.success('تم تحليل الوقائع');
            }).catch((error) => {
                toast.error(`حدث خطأ: ${error}`)
            }).finally(() => {
                toast.dismiss(loadingToast);
            })
        setIsLoading(false);
    }

    const sendData = async () => {
        if (caseId && factAnalysis) {
            setIsLoading(true);
            const loadingToast = toast.loading('جاري إنشاء الدفوع...');
            await dispatch(thunkGenerateDefenses({ caseId, caseFacts: finalFacts, legalAnalysis: factAnalysis })).unwrap()
                .then(() => {
                    toast.success('تم إنشاء الدفوع');
                    nextStep();
                }).catch((error) => {
                    toast.error(`حدث خطأ: ${error}`)
                }).finally(() => {
                    toast.dismiss(loadingToast);
                })
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // if (factAnalysis) {
        //     setAnalysisText(factAnalysis)
        // }
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [factAnalysis]);

    return (
        <div className='legal-analysis'>
            <SubTitle
                title="التحليل القانوني"
                components={
                    <div className="w-full flex justify-end">
                        <div>
                            <CustomButton
                                type="button"
                                text='اعادة التحليل القانوي'
                                radius="full"
                                size="md"
                                startContent={<IoReload />}
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                onClick={reAnalysis}
                            />
                        </div>
                    </div>
                }
            />

            {loading === 'pending' && (
                <SkeletonCardsList />
            )}
            {factAnalysis && loading === 'succeeded' && (
                <div className='w-full'>
                    <div className="w-full">
                        <h3>الواقعة القانونية</h3>
                        <CustomCard>
                            <p>{finalFacts}</p>
                        </CustomCard>
                    </div>

                    <div className="w-full mt-12">
                        <h3>التحليل القانوني المتقدم</h3>
                        <CustomCard>
                            <h3 className='mt-5'>بيانات القضية الأساسية</h3>
                            <div className=''>
                                <p><strong>نوع القضية : </strong>{factAnalysis.caseType}</p>
                                <p><strong>رقم القضية : </strong>{factAnalysis.caseNumber}</p>
                                <p><strong>المحكمة : </strong>{factAnalysis.courtName}</p>
                            </div>

                            <h3 className='mt-5'>ملخص الوقائع</h3>
                            <div className=''>
                                <ul className='pr-5'>
                                    {factAnalysis.legalFactsSummary.map((item, idx) => (
                                        <li key={idx} className='list-disc my-1'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <h3 className='mt-5'>موقف المتهم</h3>
                            <div className=''>
                                {factAnalysis.defendantsPositions.map((def, idx) => (
                                    <div key={idx}>
                                        <p className='mt-2'><strong>الاسم :  </strong>{def.defendantName}</p>
                                        <p className='mt-2'><strong>ملخص الموقف : </strong>{def.positionSummary}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className='mt-5'>خريطة الأدلة</h3>
                            <div className=''>
                                {factAnalysis.evidenceMap.map((item, idx) => (
                                    <ul key={idx} className='my-2'>
                                        <h5 className='mt-3 text-[#555] font-bold'>الأدلة رقم {idx + 1}</h5>
                                        <li>
                                            <strong>المصدر : </strong>
                                            {item.source}
                                        </li>
                                        <li>
                                            <strong>يثبت : </strong>
                                            {item.proves}
                                        </li>
                                        <li>
                                            <strong>لا يثبت : </strong>
                                            {item.doesNotProve}
                                        </li>
                                        <li>
                                            <strong>القيود : </strong>
                                            {item.limitations}
                                        </li>
                                    </ul>
                                ))}
                            </div>

                            <h3 className='mt-5'>نقاط المراجعة القانونية والفنية</h3>
                            <div className=''>
                                <ul className='pr-5'>
                                    {factAnalysis.legalAndTechnicalReviewPoints.map((item, idx) => (
                                        <li key={idx} className='list-disc my-1'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <h3 className='mt-5'>التوصيف القانوني المحتمل</h3>
                            <div className=''>
                                <p className='mb-2'><strong>نوع القضية : </strong>{factAnalysis.potentialLegalCharacterization.chargeDescription}</p>

                                <strong className='mt-2'>لعناصر التي يعتمد عليها</strong>
                                <ul className='pr-5 mb-2'>
                                    {factAnalysis.potentialLegalCharacterization.elementsReliedUpon.map((item, idx) => (
                                        <li key={idx} className='list-disc my-1'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <strong>عناصر تفتقر إلى الدليل</strong>
                                <ul className='pr-5'>
                                    {factAnalysis.potentialLegalCharacterization.elementsLackingProof.map((item, idx) => (
                                        <li key={idx} className='list-disc my-1'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </CustomCard>
                    </div>

                    <div className="w-full flex justify-end mt-10">
                        <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                            <CustomButton
                                type='button'
                                text={isLoading ? 'جاري توليد الدفوع' : 'الدفوع القانونية'}
                                size='md'
                                radius='md'
                                endContent={!isLoading && <IoArrowBackOutline />}
                                isLoading={isLoading}
                                onClick={sendData}
                            />
                        </div>
                    </div>
                </div>
            )}
            {!factAnalysis && loading === 'succeeded' && (
                <NotFoundImage text='لا توجد بيانات لعرضها' />
            )}

        </div>
    )
}

export default LegalAnalysis