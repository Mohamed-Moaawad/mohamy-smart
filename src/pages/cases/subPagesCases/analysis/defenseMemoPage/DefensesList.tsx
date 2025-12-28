import './DefenseMemoPage.css';
import { IoAdd, IoArrowBackOutline, IoReload } from "react-icons/io5"
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
import { useDisclosure } from '@heroui/react';
// import CustomModal from '../../../../../components/ui/modal/CustomModal';
// import AddNewDefense from '../../../../../components/forms/AddNewDefense';
import thunkAnalysisDefense from '../../../../../redux/analysis/thunk/thunkAnalysisDefense';
import thunkFinalRequirements from '../../../../../redux/analysis/thunk/thunkFinalRequirements​';
import CustomTextarea from '../../../../../components/ui/inputs/CustomTextarea';

type TDefensesList = {
    caseId: string;
    finalFacts: string;
    nextStep: () => void;
    setDefensesWithDetailsList: React.Dispatch<React.SetStateAction<{ title: string; detailsText: string }[]>>;
}

type TAllDefensesList = {
    evidentiaryDefenses: string[];
    proceduralDefenses: string[];
    substantiveDefenses: string[];
}


const DefensesList = ({ caseId, finalFacts, nextStep, setDefensesWithDetailsList }: TDefensesList) => {
    const { onOpen, } = useDisclosure();
    const dispatch = useAppDispatch();
    const { defenses, factAnalysis, loading } = useAppSelector((state) => state.analysis);
    const [allDefensesList, setAllDefensesList] = useState<TAllDefensesList | null>(null);



    const [isLoading, setIsLoading] = useState<boolean>(false);

    const reGenerateDefenses = async () => {
        if (caseId && factAnalysis) {
            const loadingToast = toast.loading('جاري إنشاء الدفوع...');
            setIsLoading(true);
            await dispatch(thunkGenerateDefenses({ caseId, legalAnalysisText: factAnalysis })).unwrap()
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


    // 🟢 state نخزن فيه الشرح لكل عنصر باستخدام index
    // مثال: { 0: "شرح أول دفاع", 1: "شرح ثاني دفاع" }
    const [explanations, setExplanations] = useState<Record<string, string>>({});
    // 🟢 نعرف أنهي كارد حالياً بيعمل loading
    const [loadingKey, setLoadingKey] = useState<string | null>(null);

    const generateDetailedExplanation = async (defenseTitle: string, key: string) => {
        setLoadingKey(key);
        setIsLoading(true);
        const loadingToast = toast.loading('جاري شرح الدافع...');
        console.log(key)
        console.log(defenseTitle)
        await dispatch(thunkAnalysisDefense({ defenseTitle, caseId, factsText: finalFacts })).unwrap()
            .then((textExplanation) => {
                toast.success('تم شرح الدافع');
                // نخزن الشرح في نفس index بتاع النص
                setExplanations(prev => ({
                    ...prev,
                    [key]: textExplanation.memorandumText
                }));
            }).catch((error) => {
                toast.error(`حدث خطأ: ${error}`)
            }).finally(() => {
                toast.dismiss(loadingToast);
                setLoadingKey(null);
                setIsLoading(false);
            })
        setIsLoading(false);
    }



    useEffect(() => {
        if (defenses) {
            setAllDefensesList({
                evidentiaryDefenses: defenses.evidentiaryDefenses,
                proceduralDefenses: defenses.proceduralDefenses,
                substantiveDefenses: defenses.substantiveDefenses,
            })
        }
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [defenses]);


    const [selectedDefensesList, setSelectedDefensesList] = useState<string[]>([])
    const addDefenses = (item: string) => {
        setSelectedDefensesList((prev) => {
            if (prev.includes(item)) {
                // 🗑️ امسحها
                return prev.filter((Defense) => Defense !== item);
            } else {
                // ➕ ضيفها
                return [...prev, item];
            }
        });
    }


    // ===========================================
    // ===========================================
    const findDefenseKeyByTitle = (title: string): string | null => {
        const proceduralIndex = allDefensesList?.proceduralDefenses.indexOf(title);
        if (proceduralIndex !== -1 && proceduralIndex !== undefined) {
            return `procedural-${proceduralIndex}`;
        }

        const substantiveIndex = allDefensesList?.substantiveDefenses.indexOf(title);
        if (substantiveIndex !== -1 && substantiveIndex !== undefined) {
            return `substantive-${substantiveIndex}`;
        }

        const evidentiaryIndex = allDefensesList?.evidentiaryDefenses.indexOf(title);
        if (evidentiaryIndex !== -1 && evidentiaryIndex !== undefined) {
            return `evidentiary-${evidentiaryIndex}`;
        }
        return null;
    };

    const buildSelectedDefensesWithExplanation = () => {
        return selectedDefensesList.map((defenseTitle) => {
            const key = findDefenseKeyByTitle(defenseTitle);

            return {
                title: defenseTitle,
                detailsText: key ? explanations[key] || "" : ""
            };
        });
    };
    // ===========================================
    // ===========================================



    const sendData = async () => {
        const list = buildSelectedDefensesWithExplanation();
        setDefensesWithDetailsList(list);

        setIsLoading(true);

        const loadingToast = toast.loading('جاري إنشاء الطلبات الختامية...');
        await dispatch(thunkFinalRequirements({ caseId, factsMap: [finalFacts], defensesMap: selectedDefensesList, optionalLegalReferences: null })).unwrap()
            .then(() => {
                toast.success('تم إنشاء الطلبات الختامية');
                nextStep();
            }).catch((error) => {
                toast.error(`حدث خطأ: ${error}`)
            }).finally(() => {
                toast.dismiss(loadingToast);
            })
        setIsLoading(false);
    }


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
                                text='إنشاء دافع'
                                radius="full"
                                size="md"
                                startContent={<IoAdd />}
                                // isDisabled={isLoading}
                                // isLoading={isLoading}
                                onClick={onOpen}
                            />
                        </div>
                    </div>
                }
            />

            {loading === 'pending' && (
                <SkeletonCards />
            )}

            {allDefensesList && loading === 'succeeded' && (
                <div className="w-full flex flex-wrap">
                    <h3 className="w-full title">دفوع شكلية : </h3>
                    {allDefensesList.proceduralDefenses.map((item, idx) => {
                        const key = `procedural-${idx}`;
                        return (
                            <div key={idx} className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12  p-3">
                                <CustomCard
                                    onClick={() => addDefenses(item)}
                                >
                                    <div className="head-card mb-5">
                                        <div className={`icon ${selectedDefensesList.includes(item) && 'selected'}`}>
                                            {selectedDefensesList.includes(item) && <MdDone />}
                                        </div>
                                        <span>الدفع {idx + 1}</span>
                                    </div>

                                    <h5 className="defense">{item}</h5>

                                    {explanations[key] && (
                                        <div className='overflow-y-auto mb-4'>
                                            <CustomTextarea
                                                label=''
                                                placeholder=''
                                                variant='flat'
                                                value={explanations[key]}
                                                readOnly
                                            />
                                        </div>
                                    )}
                                    <div className="flex justify-end">
                                        <div className="w-full sm:w-6/12 md:w-">
                                            <CustomButton
                                                type="button"
                                                text={loadingKey === key ? 'جاري شرح الدافع' : "شرح تفصيلي"}
                                                size="md"
                                                radius="full"
                                                startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                                onClick={() => generateDetailedExplanation(item, key)}
                                            />
                                        </div>
                                    </div>
                                </CustomCard>
                            </div>
                        )
                    })}

                    <h3 className="w-full title">دفوع موضوعية : </h3>
                    {allDefensesList.substantiveDefenses.map((item, idx) => {
                        const key = `substantive-${idx}`;
                        return (
                            <div key={idx} className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12  p-3">
                                <CustomCard
                                    onClick={() => addDefenses(item)}
                                >
                                    <div className="head-card mb-5">
                                        <div className={`icon ${selectedDefensesList.includes(item) && 'selected'}`}>
                                            {selectedDefensesList.includes(item) && <MdDone />}
                                        </div>
                                        <span>الدفع {idx + 1}</span>
                                    </div>

                                    <h5 className="defense">{item}</h5>

                                    {explanations[key] && (
                                        <div className='overflow-y-auto mb-4'>
                                            <CustomTextarea
                                                label=''
                                                placeholder=''
                                                variant='flat'
                                                value={explanations[key]}
                                                readOnly
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <div className="w-full sm:w-6/12 md:w-">
                                            <CustomButton
                                                type="button"
                                                text={loadingKey === key ? 'جاري شرح الدافع' : "شرح تفصيلي"}
                                                size="md"
                                                radius="full"
                                                startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                                onClick={() => generateDetailedExplanation(item, key)}
                                            />
                                        </div>
                                    </div>

                                </CustomCard>
                            </div>
                        )
                    })}

                    <h3 className="w-full title">دفوع موضوعية بالأدلة : </h3>
                    {allDefensesList.evidentiaryDefenses.map((item, idx) => {
                        const key = `evidentiary-${idx}`;
                        return (
                            <div key={idx} className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12  p-3">
                                <CustomCard
                                    onClick={() => addDefenses(item)}
                                >
                                    <div className="head-card mb-5">
                                        <div className={`icon ${selectedDefensesList.includes(item) && 'selected'}`}>
                                            {selectedDefensesList.includes(item) && <MdDone />}
                                        </div>
                                        <span>الدفع {idx + 1}</span>
                                    </div>

                                    <h5 className="defense">{item}</h5>

                                    {explanations[key] && (
                                        <div className='overflow-y-auto mb-4'>
                                            <CustomTextarea
                                                label=''
                                                placeholder=''
                                                variant='flat'
                                                value={explanations[key]}
                                                readOnly
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <div className="w-full sm:w-6/12 md:w-">
                                            <CustomButton
                                                type="button"
                                                text={loadingKey === key ? 'جاري شرح الدافع' : "شرح تفصيلي"}
                                                size="md"
                                                radius="full"
                                                startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                                onClick={() => generateDetailedExplanation(item, key)}
                                            />
                                        </div>
                                    </div>
                                </CustomCard>
                            </div>
                        )
                    })}

                    <div className="w-full flex justify-end mt-10">
                        <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                            <CustomButton
                                type='button'
                                text={isLoading ? 'جاري توليد الطلبات الختامية' : 'الطلبات الختامية'}
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
            {!allDefensesList && loading === 'succeeded' && (
                <NotFoundImage text="لا توجد دفوع. يجيب إعاجة المحاولة" />
            )}

            {/* <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} size='lg' title='شرح الدافع' >
                <AddNewDefense
                    allDefensesList={allDefensesList}
                    setAllDefensesList={setAllDefensesList}
                    onOpenChange={onOpenChange}
                />
                <p className='max-h-[60vh] overflow-y-auto'>
                    {analysisDefenses?.memorandumText}
                </p>
            </CustomModal> */}
        </div>
    );
};

export default DefensesList;