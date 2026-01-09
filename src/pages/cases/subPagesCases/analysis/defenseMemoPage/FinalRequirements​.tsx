import './DefenseMemoPage.css';
import { useEffect, useState } from "react";
import { IoAdd, IoArrowBackOutline } from "react-icons/io5";
import SubTitle from "../../../../../components/subTitle/SubTitle";
import CustomButton from "../../../../../components/ui/buttons/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import SkeletonCards from "../../../../../components/skeleton/SkeletonCards";
import CustomCard from "../../../../../components/ui/card/CustomCard";
import { MdDone } from "react-icons/md";
import NotFoundImage from "../../../../../components/notFound/NotFoundImage";
import toast from 'react-hot-toast';
import thunkGetSummary from '../../../../../redux/analysis/thunk/thunkGeneratePdf';

type TFinalRequirements = {
    caseId: string;
    finalFacts: string;
    nextStep: () => void;
}
const FinalRequirements = ({ caseId, nextStep }: TFinalRequirements) => {
    const dispatch = useAppDispatch();
    const { finalRequirements, loading } = useAppSelector((state) => state.analysis);
    console.log(finalRequirements);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedRequirementsList, setSelectedRequirementsList] = useState<{
        id: string;
        requestLevel: string;
        requestText: string;
    }[]>([]);


    const addRequirement = (item: string) => {
        setSelectedRequirementsList((prev) => {
            if (prev.includes(item)) {
                // 🗑️ امسحها
                return prev.filter((Defense) => Defense !== item);
            } else {
                // ➕ ضيفها
                return [...prev, item];
            }
        });
    }
    // console.log(selectedRequirementsList);

    const sendData = async () => {
        setIsLoading(true);
        const loadingToast = toast.loading('جاري إنشاء المذكرة النهائية...');
        try {
            await dispatch(thunkGetSummary({ caseId })).unwrap();
            toast.success('تم إنشاء المذكرة النهائية');
            nextStep();
        } catch (error) {
            toast.error(`حدث خطأ: ${error}`);
        } finally {
            toast.dismiss(loadingToast);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (finalRequirements) {
            setSelectedRequirementsList(finalRequirements)
        }
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [finalRequirements]);

    return (
        <div className="final-requirements">
            <SubTitle
                title="الطلبات الختامية"
                components={
                    <div className="w-full flex justify-end gap-4">
                        <div>
                            <CustomButton
                                type="button"
                                text='إنشاء طلب'
                                radius="full"
                                size="md"
                                startContent={<IoAdd />}
                            // isDisabled={isLoading}
                            // isLoading={isLoading}
                            // onClick={onOpen}
                            />
                        </div>
                    </div>
                }
            />

            {loading === 'pending' && (
                <SkeletonCards />
            )}

            {finalRequirements.length > 0 && loading === 'succeeded' && (
                <div className="flex flex-wrap">
                    {finalRequirements.map((item, idx) => (
                        <div key={item.id} className="w-full md:w-6/12 lg:w-4/12 p-3">
                            <CustomCard
                                onClick={() => addRequirement(item.requestText)}
                            >
                                <div className="head-card mb-5">
                                    <div className={`icon ${selectedRequirementsList.includes(item.requestText) && 'selected'}`}>
                                        {selectedRequirementsList.includes(item.requestText) && <MdDone />}
                                    </div>
                                    <span>الطلب رقم {idx + 1}</span>
                                </div>
                                <div className="badge">
                                    <span>{item.requestLevel}</span>
                                </div>
                                <p className="defense">{item.requestText}</p>
                            </CustomCard>
                        </div>
                    ))}

                    <div className="w-full flex justify-end mt-10">
                        <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                            <CustomButton
                                type='button'
                                text={isLoading ? 'جاري توليد المذكرة النهائية' : 'المذكرة النهائية'}
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
            {finalRequirements.length === 0 && loading === 'succeeded' && (
                <NotFoundImage text="لا توجد بيانات لعرضها" />
            )}
        </div>
    )
}

export default FinalRequirements;