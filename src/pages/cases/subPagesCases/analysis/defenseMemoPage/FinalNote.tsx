import { FiDownload } from "react-icons/fi"
import SubTitle from "../../../../../components/subTitle/SubTitle"
import CustomButton from "../../../../../components/ui/buttons/CustomButton"
import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { Skeleton } from "@heroui/react";
import NotFoundImage from "../../../../../components/notFound/NotFoundImage";
import CustomTextarea from "../../../../../components/ui/inputs/CustomTextArea";
import CustomCard from "../../../../../components/ui/card/CustomCard";

type TFinalNote = {
    pdf: string;
}

const FinalNote = ({ pdf }: TFinalNote) => {
    const { loading } = useAppSelector((state) => state.analysis);
    const downloadPDF = () => {
        // if (!generatePdf) return;
        // const url = URL.createObjectURL(generatePdf);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = "memo.pdf"; // اسم الملف اللي هيتم تحميله
        // link.click();
        // URL.revokeObjectURL(url); // مسح الـ object URL بعد التحميل

        // إنشاء رابط التحميل وفتح الملف
        const link = document.createElement("a");
        link.href = pdf;
        link.download = "mohamy-smart.pdf";
        link.click();
    };

    return (
        <div className="final-note">
            <SubTitle
                title="الطلبات الختامية"
            />

            {loading === 'pending' && (
                <Skeleton className="w-full h-[40vh]" />
            )}

            {pdf && loading === 'succeeded' && (
                <div className="w-full">
                    <SubTitle
                        title="المذكرة القانونية"
                        components={
                            <div className="w-full flex justify-end gap-4">
                                <div>
                                    <CustomButton
                                        type="button"
                                        text='تحميل'
                                        radius="full"
                                        size="md"
                                        startContent={<FiDownload />}
                                        onClick={downloadPDF}
                                    />
                                </div>
                            </div>
                        }
                    />
                    {/* <CustomTextarea
                        label="المذكرة القانونية"
                        placeholder="المذكرة القانونية"
                        variant="flat"
                        value="الملف جاهز"
                        readOnly
                    /> */}
                    <CustomCard>
                        <iframe
                            src={pdf}
                            width="100%"
                            height="600px"
                            title="PDF Preview"
                        />
                    </CustomCard>
                </div>
            )}

            {!pdf && loading === 'succeeded' && (
                <NotFoundImage text="لا توجد بيانات لعرضها" />
            )}
        </div>
    );
};

export default FinalNote;