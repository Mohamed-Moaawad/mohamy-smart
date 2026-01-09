import './DefenseMemoPage.css';
import { FiDownload } from "react-icons/fi"
import SubTitle from "../../../../../components/subTitle/SubTitle"
import CustomButton from "../../../../../components/ui/buttons/CustomButton"
import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { Skeleton } from "@heroui/react";
import NotFoundImage from "../../../../../components/notFound/NotFoundImage";
import CustomTextarea from "../../../../../components/ui/inputs/CustomTextarea";
import { IoArrowBackOutline } from 'react-icons/io5';

import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
} from "docx";
// import { saveAs } from "file-saver";
// import toast from 'react-hot-toast';

const FinalNote = () => {
    const { summary, loading } = useAppSelector((state) => state.analysis);

    const downloadMemoTemplate = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        // بسم الله
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                            children: [
                                new TextRun({
                                    text: "بسم الله الرحمن الرحيم",
                                    bold: true,
                                    size: 26,
                                }),
                            ],
                        }),

                        // اسم المحكمة
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: "محكمة البلينا الجزئية",
                                    bold: true,
                                    size: 26,
                                }),
                            ],
                        }),

                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: "الدائرة المدنية",
                                    size: 24,
                                }),
                            ],
                            spacing: { after: 200 },
                        }),

                        // نوع المذكرة
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: "مذكرة بطلبات ودفاع",
                                    bold: true,
                                    size: 24,
                                }),
                            ],
                            spacing: { after: 300 },
                        }),

                        // الخصوم
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({ text: "مقدمة من / ", bold: true }),
                                new TextRun("المقيم بني جميل – مركز البلينا – سوهاج"),
                            ],
                        }),

                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            spacing: { after: 200 },
                            children: [
                                new TextRun({ text: "(مدعي)", bold: true }),
                            ],
                        }),

                        // رقم القضية
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                            children: [
                                new TextRun({ text: "في القضية رقم ", bold: true }),
                                new TextRun("318 لسنة 2018"),
                                new TextRun(" مدني البلينا"),
                            ],
                        }),

                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                            children: [
                                new TextRun({ text: "والمحدد لنظرها جلسة ", bold: true }),
                                new TextRun("21 / 10 / 2018"),
                            ],
                        }),

                        // ضد
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                            children: [
                                new TextRun({
                                    text: "ضــــد",
                                    bold: true,
                                    size: 24,
                                }),
                            ],
                        }),

                        // الخصم
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 300 },
                            children: [
                                new TextRun("شيخ الجامع الأزهر الشريف وآخرين"),
                            ],
                        }),

                        // الوقائع
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            spacing: { before: 300 },
                            children: [
                                new TextRun({
                                    text: "الوقــائــع",
                                    bold: true,
                                    size: 24,
                                }),
                            ],
                        }),

                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            spacing: { after: 200 },
                            children: [
                                new TextRun(
                                    JSON.stringify(summary, null, 2)
                                ),
                            ],
                        }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "مذكرة.docx";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="final-note">
            <SubTitle
                title="الطلبات الختامية"
            />

            {loading === 'pending' && (
                <Skeleton className="w-full h-[40vh]" />
            )}

            {summary && loading === 'succeeded' && (
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
                                        onClick={downloadMemoTemplate}
                                    />
                                </div>
                            </div>
                        }
                    />
                    <div className='w-full'>
                        <CustomTextarea
                            label="المذكرة القانونية"
                            placeholder="المذكرة القانونية"
                            variant="flat"
                            rows={20}
                            value={JSON.stringify(summary, null, 2)}
                            readOnly
                        />
                    </div>

                    <div className="w-full flex justify-end mt-10">
                        <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                            <CustomButton
                                type='button'
                                text={'المناقشة القانونية'}
                                size='md'
                                radius='md'
                                endContent={<IoArrowBackOutline />}
                            // isLoading={isLoading}
                            // onClick={sendData}
                            />
                        </div>
                    </div>

                </div>
            )}
            {!summary && loading === 'succeeded' && (
                <NotFoundImage text="لا توجد بيانات لعرضها" />
            )}
        </div>
    )
}

export default FinalNote;