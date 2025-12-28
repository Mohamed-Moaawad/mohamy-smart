import './DefenseMemoPage.css';
import { useEffect, useState } from "react";
import { IoAdd, IoArrowBackOutline } from "react-icons/io5";
import SubTitle from "../../../../../components/subTitle/SubTitle";
import CustomButton from "../../../../../components/ui/buttons/CustomButton";
import CustomCard from "../../../../../components/ui/card/CustomCard";
import { MdDone } from "react-icons/md";
import CustomModal from '../../../../../components/ui/modal/CustomModal';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import thunkFactAnalysis from '../../../../../redux/analysis/thunk/thunkFactAnalysis';
import toast from 'react-hot-toast';
import AddNewFact from '../../../../../components/forms/AddNewFact';
import { useDisclosure } from '@heroui/react';


type TFactsReview = {
    facts: string;
    nextStep: () => void;
    setFinalFacts: React.Dispatch<React.SetStateAction<string>>;
    caseId: string;
}

const FactsReview = ({ facts, nextStep, setFinalFacts, caseId }: TFactsReview) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [caseFacts, setCaseFacts] = useState<string[]>([facts]);
    const [selectedFacts, setSelectedFacts] = useState<string[]>([facts]);



    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendData = async () => {
        const loadingToast = toast.loading('جاري تحليل الوقائع...');
        setIsLoading(true);

        const factsText = selectedFacts.join('')
        await dispatch(thunkFactAnalysis({ caseId, caseFacts: factsText })).unwrap()
            .then(() => {
                setFinalFacts(factsText);
                toast.success('تم تحليل الوقائع');
                nextStep();
            }).catch((error) => {
                toast.error(`حدث خطأ: ${error}`)
            }).finally(() => {
                toast.dismiss(loadingToast);
            })
        setIsLoading(false);
    }


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

    const toggleFact = (item: string) => {
        setSelectedFacts((prev) => {
            if (prev.includes(item)) {
                // 🗑️ امسحها
                return prev.filter((fact) => fact !== item);
            } else {
                // ➕ ضيفها
                return [...prev, item];
            }
        });
        console.log(selectedFacts);
    }

    return (
        <div className="facts-page w-full mt-10">
            <SubTitle
                title="مراجعة الوقائع"
                components={
                    <div className="w-full flex justify-end">
                        <div>
                            <CustomButton
                                type="button"
                                text="انشاء وقائع"
                                radius="full"
                                size="md"
                                startContent={<IoAdd />}
                                onClick={onOpen}
                            />
                        </div>
                    </div>}
            />
            <div className="flex flex-wrap mt-5">
                {caseFacts.map((fact, idx) => (
                    <div key={idx} className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-1">
                        <CustomCard
                            onClick={() => toggleFact(fact)}
                        >
                            <div className="head-card mb-5">
                                <div className={`icon ${selectedFacts.includes(fact) && 'selected'}`}>
                                    {selectedFacts.includes(fact) && <MdDone />}
                                </div>
                                <span>الواقعة {idx + 1}</span>
                            </div>
                            <p>{fact}</p>
                        </CustomCard>
                    </div>
                ))}

                <div className="w-full flex justify-end mt-10">
                    <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                        <CustomButton
                            type='button'
                            text={isLoading ? 'جاري تحليل الوقائع' : 'بدء التحليل القانوني'}
                            size='md'
                            radius='md'
                            endContent={!isLoading && <IoArrowBackOutline />}
                            isLoading={isLoading}
                            onClick={sendData}
                        />
                    </div>
                </div>
            </div>

            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} size='xl' title='إضافة وقائع جديد'>
                <div className="w-full">
                    <AddNewFact setCaseFacts={setCaseFacts} caseFacts={caseFacts} onOpenChange={onOpenChange} />
                </div>
            </CustomModal>
        </div>
    );
};

export default FactsReview;