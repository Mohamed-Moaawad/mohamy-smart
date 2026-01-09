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
// import thunkGenerateDefenses from "../../../../../redux/analysis/thunk/thunkGenerateDefenses";
import { useDisclosure } from '@heroui/react';
// import CustomModal from '../../../../../components/ui/modal/CustomModal';
// import AddNewDefense from '../../../../../components/forms/AddNewDefense';
import thunkAnalysisDefense from '../../../../../redux/analysis/thunk/thunkAnalysisDefense';
import thunkFinalRequirements from '../../../../../redux/analysis/thunk/thunkFinalRequirements​';
import CustomModal from '../../../../../components/ui/modal/CustomModal';

type TDefensesList = {
    caseId: string;
    finalFacts: string;
    nextStep: () => void;
}

type TDefense = {
    id: string;
    defenseTitle: string;
    basisFromCase: string;
    scope: string;
    strength: "Strong" | "Medium" | "Weak";
};
type TAllDefensesList = {
    defensesFormal: TDefense[];
    defensesSubstantive: TDefense[];
    defensesEvidentiary: TDefense[];
}


const DefensesList = ({ caseId, nextStep }: TDefensesList) => {
    const { onOpen, isOpen, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const { defenses, factAnalysis, loading } = useAppSelector((state) => state.analysis);
    const [allDefensesList, setAllDefensesList] = useState<TAllDefensesList | null>(null);



    const [isLoading, setIsLoading] = useState<boolean>(false);

    const reGenerateDefenses = async () => {
        if (caseId && factAnalysis) {
            // const loadingToast = toast.loading('جاري إنشاء الدفوع...');
            // setIsLoading(true);
            // await dispatch(thunkGenerateDefenses({ caseId, legalAnalysis: factAnalysis })).unwrap()
            //     .then(() => {
            //         toast.success('تم إنشاء الدفوع');
            //     }).catch((error) => {
            //         toast.error(`حدث خطأ: ${error}`)
            //     }).finally(() => {
            //         toast.dismiss(loadingToast);
            //     })
            // setIsLoading(false);
        }
    }


    const [perExplanation, setPerExplanation] = useState()
    const generateDetailedExplanation = async (defenseId: string) => {
        setIsLoading(true);
        const loadingToast = toast.loading('جاري شرح الدافع...');
        console.log(defenseId)
        try {
            const textExplanation = await dispatch(thunkAnalysisDefense({ defenseId })).unwrap()
            toast.success('تم شرح الدافع');
            setPerExplanation(textExplanation);
            onOpen();
        } catch (error) {
            toast.error(`حدث خطأ: ${error}`)
        } finally {
            toast.dismiss(loadingToast);
        }
        setIsLoading(false);
    }



    useEffect(() => {
        if (defenses) {
            setAllDefensesList({
                defensesFormal: defenses.defensesFormal,
                defensesSubstantive: defenses.defensesSubstantive,
                defensesEvidentiary: defenses.defensesEvidentiary,
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
    console.log(selectedDefensesList)

    // ===========================================
    // ===========================================
    // const findDefenseKeyByTitle = (title: string): string | null => {
    //     const proceduralIndex = allDefensesList?.proceduralDefenses.indexOf(title);
    //     if (proceduralIndex !== -1 && proceduralIndex !== undefined) {
    //         return `procedural-${proceduralIndex}`;
    //     }

    //     const substantiveIndex = allDefensesList?.substantiveDefenses.indexOf(title);
    //     if (substantiveIndex !== -1 && substantiveIndex !== undefined) {
    //         return `substantive-${substantiveIndex}`;
    //     }

    //     const evidentiaryIndex = allDefensesList?.evidentiaryDefenses.indexOf(title);
    //     if (evidentiaryIndex !== -1 && evidentiaryIndex !== undefined) {
    //         return `evidentiary-${evidentiaryIndex}`;
    //     }
    //     return null;
    // };

    // const buildSelectedDefensesWithExplanation = () => {
    //     return selectedDefensesList.map((defenseTitle) => {
    //         const key = findDefenseKeyByTitle(defenseTitle);

    //         return {
    //             title: defenseTitle,
    //             detailsText: key ? explanations[key] || "" : ""
    //         };
    //     });
    // };
    // ===========================================
    // ===========================================



    const sendData = async () => {
        setIsLoading(true);
        const loadingToast = toast.loading('جاري إنشاء الطلبات الختامية...');
        try {
            await dispatch(thunkFinalRequirements({ caseId })).unwrap()
            toast.success('تم إنشاء الطلبات الختامية');
            nextStep();
        } catch (error) {
            toast.error(`حدث خطأ: ${error}`)
        } finally {
            toast.dismiss(loadingToast);
        }
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
                    <h3 className="w-full title">الدفوع الرسمية : </h3>
                    {allDefensesList.defensesFormal.map((item, idx) => {
                        return (
                            <div key={item.id} className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12  p-3">
                                <CustomCard
                                    onClick={() => addDefenses(item.id)}
                                >
                                    <div className="head-card mb-5">
                                        <div className={`icon ${selectedDefensesList.includes(item.id) && 'selected'}`}>
                                            {selectedDefensesList.includes(item.id) && <MdDone />}
                                        </div>
                                        <span>الدفع {idx + 1}</span>
                                    </div>
                                    <div className={`strength ${item.strength}`}>
                                        <span>
                                            {item.strength === 'Weak' ? 'ضعيف' : item.strength === 'Medium' ? 'متوسط' : 'قوي'}
                                        </span>
                                        <h5>{item.scope}</h5>
                                    </div>
                                    <h5 className="defense">{item.defenseTitle}</h5>
                                    <p className='my-3'><strong>أساس من القضية : </strong>{item.basisFromCase}</p>

                                    {/* {explanations[key] && (
                                        <div className='overflow-y-auto mb-4'>
                                            <CustomTextarea
                                                label=''
                                                placeholder=''
                                                variant='flat'
                                                value={explanations[key]}
                                                readOnly
                                            />
                                        </div>
                                    )} */}
                                    <div className="flex justify-end">
                                        <div className="w-full sm:w-6/12 md:w-">
                                            <CustomButton
                                                type="button"
                                                // text={loadingKey === key ? 'جاري شرح الدافع' : "شرح تفصيلي"}
                                                text={"شرح تفصيلي"}
                                                size="md"
                                                radius="full"
                                                startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                                onClick={() => generateDetailedExplanation(item.id)}
                                            />
                                        </div>
                                    </div>
                                </CustomCard>
                            </div>
                        )
                    })}

                    <h3 className="w-full title">الدفوع الموضوعية : </h3>
                    {allDefensesList.defensesSubstantive.map((item, idx) => {
                        return (
                            <div key={item.id} className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12  p-3">
                                <CustomCard
                                    onClick={() => addDefenses(item.id)}
                                >
                                    <div className="head-card mb-5">
                                        <div className={`icon ${selectedDefensesList.includes(item.id) && 'selected'}`}>
                                            {selectedDefensesList.includes(item.id) && <MdDone />}
                                        </div>
                                        <span>الدفع {idx + 1}</span>
                                    </div>
                                    <div className={`strength ${item.strength}`}>
                                        <span>
                                            {item.strength === 'Weak' ? 'ضعيف' : item.strength === 'Medium' ? 'متوسط' : 'قوي'}
                                        </span>
                                        <h5>{item.scope}</h5>
                                    </div>
                                    <h5 className="defense">{item.defenseTitle}</h5>
                                    <p className='my-3'><strong>أساس من القضية : </strong>{item.basisFromCase}</p>
                                    {/* {explanations[key] && (
                                        <div className='overflow-y-auto mb-4'>
                                            <CustomTextarea
                                                label=''
                                                placeholder=''
                                                variant='flat'
                                                value={explanations[key]}
                                                readOnly
                                            />
                                        </div>
                                    )} */}
                                    <div className="flex justify-end">
                                        <div className="w-full sm:w-6/12 md:w-">
                                            <CustomButton
                                                type="button"
                                                // text={loadingKey === key ? 'جاري شرح الدافع' : "شرح تفصيلي"}
                                                text={"شرح تفصيلي"}
                                                size="md"
                                                radius="full"
                                                startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                                onClick={() => generateDetailedExplanation(item.id)}
                                            />
                                        </div>
                                    </div>
                                </CustomCard>
                            </div>
                        )
                    })}

                    <h3 className="w-full title">أدلة الدفوع : </h3>
                    {allDefensesList.defensesEvidentiary.map((item, idx) => {
                        return (
                            <div key={item.id} className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12  p-3">
                                <CustomCard
                                    onClick={() => addDefenses(item.id)}
                                >
                                    <div className="head-card mb-5">
                                        <div className={`icon ${selectedDefensesList.includes(item.id) && 'selected'}`}>
                                            {selectedDefensesList.includes(item.id) && <MdDone />}
                                        </div>
                                        <span>الدفع {idx + 1}</span>
                                    </div>
                                    <div className={`strength ${item.strength}`}>
                                        <span>
                                            {item.strength === 'Weak' ? 'ضعيف' : item.strength === 'Medium' ? 'متوسط' : 'قوي'}
                                        </span>
                                        <h5>{item.scope}</h5>
                                    </div>
                                    <h5 className="defense">{item.defenseTitle}</h5>
                                    <p className='my-3'><strong>أساس من القضية : </strong>{item.basisFromCase}</p>
                                    {/* {explanations[key] && (
                                        <div className='overflow-y-auto mb-4'>
                                            <CustomTextarea
                                                label=''
                                                placeholder=''
                                                variant='flat'
                                                value={explanations[key]}
                                                readOnly
                                            />
                                        </div>
                                    )} */}
                                    <div className="flex justify-end">
                                        <div className="w-full sm:w-6/12 md:w-">
                                            <CustomButton
                                                type="button"
                                                // text={loadingKey === key ? 'جاري شرح الدافع' : "شرح تفصيلي"}
                                                text={"شرح تفصيلي"}
                                                size="md"
                                                radius="full"
                                                startContent={<img src="../../../../../../public/images/ai-icon-white.png" alt="icon" />}
                                                onClick={() => generateDetailedExplanation(item.id)}
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

            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} size='lg' title='شرح الدافع' >
                {/* <AddNewDefense
                    allDefensesList={allDefensesList}
                    setAllDefensesList={setAllDefensesList}
                    onOpenChange={onOpenChange}
                /> */}
                <pre className='max-h-[60vh] overflow-y-auto' style={{ whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(perExplanation, null, 2)}
                </pre>
            </CustomModal>
        </div>
    );
};

export default DefensesList;