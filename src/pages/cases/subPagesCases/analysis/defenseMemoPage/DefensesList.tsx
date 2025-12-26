import { IoAdd, IoReload } from "react-icons/io5"
import { useEffect, useState } from "react";
import SubTitle from "../../../../../components/subTitle/SubTitle"
import CustomButton from "../../../../../components/ui/buttons/CustomButton"
import CustomCard from "../../../../../components/ui/card/CustomCard"
import { MdDone } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks"
import SkeletonCards from "../../../../../components/skeleton/SkeletonCards"
import NotFoundImage from "../../../../../components/notFound/NotFoundImage"
import toast from "react-hot-toast";
import thunkGenerateDefenses from "../../../../../redux/analysis/thunk/thunkGenerateDefenses";

type TDefensesList = {
    finalFacts: string;
    nextStep: () => void;
    caseId: string;
}


const DefensesList = ({ caseId }: TDefensesList) => {
    const dispatch = useAppDispatch();
    const { defenses, loading } = useAppSelector((state) => state.analysis);
    const { factAnalysis } = useAppSelector((state) => state.analysis);

    console.log(defenses);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const reGenerateDefenses = async () => {
        console.log(caseId)
        console.log(factAnalysis)
        if (caseId && factAnalysis) {
            console.log(2)
            const loadingToast = toast.loading('جاري إنشاء الدفوع...');
            setIsLoading(true);
            await dispatch(thunkGenerateDefenses({ caseId, legalAnalysisText: factAnalysis.description })).unwrap()
                .then(() => {
                    toast.success('تم إنشاء الدفوع');
                }).catch((error) => {
                    toast.error(`حدث خطأ: ${error}`)
                }).finally(() => {
                    toast.dismiss(loadingToast);
                })
            setIsLoading(false);
        }
    }

    // const generateDetailedExplanation = async () => {

    // }


    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className="defenses-list">
            <SubTitle
                title="التحليل القانوني"
                components={
                    <div className="w-full flex justify-end gap-4">
                        <div>
                            <CustomButton
                                type="button"
                                text='اعادة التوليد'
                                radius="full"
                                size="md"
                                startContent={<IoReload />}
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                onClick={reGenerateDefenses}
                            />
                        </div>
                        <div>
                            <CustomButton
                                type="button"
                                text='انشاء دافع'
                                radius="full"
                                size="md"
                                startContent={<IoAdd />}
                            // isDisabled={isLoading}
                            // isLoading={isLoading}
                            // onClick={reAnalysis}
                            />
                        </div>
                    </div>
                }
            />

            {loading === 'pending' && (
                <SkeletonCards />
            )}

            {defenses && loading === 'succeeded' && (
                <div className="w-full flex flex-wrap">
                    <h3 className="w-full text-center title"><sup>"</sup>دفوع شكلية<sup>"</sup></h3>
                    {defenses.proceduralDefenses.map((item, idx) => (
                        <div key={idx} className="w-full sm:w-6/12 md:w-6/12 lg:w-3/12  p-3">
                            <CustomCard>
                                <div className="head-card mb-5">
                                    <div className="icon">
                                        <MdDone />
                                    </div>
                                    <span>الدفع {idx + 1}</span>
                                </div>
                                {/* <div className="w-full flex gap-5 types">
                                    <div>اجرائئ</div>
                                    <div className={`bg-[red]`}>متوسط</div>
                                </div> */}
                                <h5 className="defense">{item}</h5>
                                <div className="flex justify-end">
                                    <div className="w-full sm:w-6/12 md:w-">
                                        <CustomButton
                                            type="button"
                                            text="شرح تفصيلي"
                                            size="md"
                                            radius="full"
                                            startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                        />
                                    </div>
                                </div>
                            </CustomCard>
                        </div>
                    ))}

                    <h3 className="w-full text-center title"><sup>"</sup>دفوع موضوعية<sup>"</sup></h3>
                    {defenses.substantiveDefenses.map((item, idx) => (
                        <div key={idx} className="w-full sm:w-6/12 md:w-6/12 lg:w-3/12  p-3">
                            <CustomCard>
                                <div className="head-card mb-5">
                                    <div className="icon">
                                        <MdDone />
                                    </div>
                                    <span>الدفع {idx + 1}</span>
                                </div>
                                {/* <div className="w-full flex gap-5 types">
                                   <div>اجرائئ</div>
                                   <div className={`bg-[red]`}>متوسط</div>
                               </div> */}
                                <h5 className="defense">{item}</h5>
                                <div className="flex justify-end">
                                    <div className="w-full sm:w-6/12 md:w-">
                                        <CustomButton
                                            type="button"
                                            text="شرح تفصيلي"
                                            size="md"
                                            radius="full"
                                            startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                        />
                                    </div>
                                </div>
                            </CustomCard>
                        </div>
                    ))}

                    <h3 className="w-full text-center title"><sup>"</sup>دفوع موضوعية بالأدلة<sup>"</sup></h3>
                    {defenses.evidentiaryDefenses.map((item, idx) => (
                        <div key={idx} className="w-full sm:w-6/12 md:w-6/12 lg:w-3/12  p-3">
                            <CustomCard>
                                <div className="head-card mb-5">
                                    <div className="icon">
                                        <MdDone />
                                    </div>
                                    <span>الدفع {idx + 1}</span>
                                </div>
                                {/* <div className="w-full flex gap-5 types">
                                   <div>اجرائئ</div>
                                   <div className={`bg-[red]`}>متوسط</div>
                               </div> */}
                                <h5 className="defense">{item}</h5>
                                <div className="flex justify-end">
                                    <div className="w-full sm:w-6/12 md:w-">
                                        <CustomButton
                                            type="button"
                                            text="شرح تفصيلي"
                                            size="md"
                                            radius="full"
                                            startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                        />
                                    </div>
                                </div>
                            </CustomCard>
                        </div>
                    ))}
                </div>
            )}
            {!defenses && loading === 'succeeded' && (
                <NotFoundImage text="لا توجد دفوع. يجيب إعاجة المحاولة" />
            )}
        </div>
    )
}

export default DefensesList