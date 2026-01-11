import './DefenseMemoPage.css';
import { useEffect, useState } from 'react';
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




type TDefense = {
    id: string;
    defenseTitle: string;
    basisFromCase: string;
    scope: string;
    strength: "Strong" | "Medium" | "Weak";
};

type TDefenses = {
    defensesFormal: TDefense[];
    defensesSubstantive: TDefense[];
    defensesEvidentiary: TDefense[];
}

type TFactAnalysis = {
    caseType: string;
    caseNumber: string;
    courtName: string;
    legalFactsSummary: string[];
    defendantsPositions: {
        defendantName: string;
        positionSummary: string;
    }[];
    evidenceMap: {
        source: string;
        proves: string;
        doesNotProve: string;
        limitations: string;
    }[];
    legalAndTechnicalReviewPoints: string[];
    potentialLegalCharacterization: {
        chargeDescription: string;
        elementsReliedUpon: string[];
        elementsLackingProof: string[];
    };
}

type TFinalRequirements = {
    id: string;
    requestLevel: string;
    requestText: string;
}

type TSummary = {
    caseId: string;
    caseNumber: string;
    caseType: string;
    courtName: string;
    clientName: string;
    apponentName: string;
    factAnalysis: TFactAnalysis;
    defenses: TDefenses;
    finalRequirements: {
        finalPrayers: TFinalRequirements[];
    };
} | null;






const FinalNote = () => {
    const { summary, loading } = useAppSelector((state) => state.analysis);

    const [valueText, setValueText] = useState('');

    const formatSummaryToText = (summary: TSummary) => {
        if (!summary) return "";

        const {
            caseNumber,
            caseType,
            courtName,
            clientName,
            apponentName,
            factAnalysis,
            defenses,
            finalRequirements,
        } = summary;

        return `
                رقم القضية: ${caseNumber}
                نوع القضية: ${caseType}
                المحكمة: ${courtName}
                الموكل: ${clientName}
                الخصم: ${apponentName}
                
                ====================================
                أولاً: الوقــائــع
                ====================================
                ${factAnalysis.legalFactsSummary
                .map((item: string, index: number) => `${index + 1}- ${item}`)
                .join("\n")}
                
                ====================================
                ثانياً: موقف المتهم
                ====================================
                ${factAnalysis.defendantsPositions
                .map(
                    (d, index: number) =>
                        `${index + 1}- المتهم / ${d.defendantName}:\n${d.positionSummary}`
                )
                .join("\n\n")}
                
                ====================================
                ثالثاً: الأدلة في الدعوى
                ====================================
                ${factAnalysis.evidenceMap
                .map(
                    (e, index: number) => `
                ${index + 1}- ${e.source}
                - ما يثبته: ${e.proves}
                - ما لا يثبته: ${e.doesNotProve}
                - أوجه القصور: ${e.limitations}
                `
                )
                .join("\n")}
                
                ====================================
                رابعاً: الملاحظات القانونية والفنية
                ====================================
                ${factAnalysis.legalAndTechnicalReviewPoints
                .map((point: string, index: number) => `${index + 1}- ${point}`)
                .join("\n")}
                
                ====================================
                خامساً: التكييف القانوني المحتمل
                ====================================
                الوصف القانوني:
                ${factAnalysis.potentialLegalCharacterization.chargeDescription}
                
                أركان الجريمة المستند إليها:
                ${factAnalysis.potentialLegalCharacterization.elementsReliedUpon
                .map((el: string, index: number) => `${index + 1}- ${el}`)
                .join("\n")}
                
                أوجه القصور في الأركان:
                ${factAnalysis.potentialLegalCharacterization.elementsLackingProof
                .map((el: string, index: number) => `${index + 1}- ${el}`)
                .join("\n")}
                
                ====================================
                سادساً: الدفــوع
                ====================================
                
                الدفوع الشكلية:
                ${defenses.defensesFormal
                .map(
                    (d, index: number) =>
                        `${index + 1}- ${d.defenseTitle}
                الأساس: ${d.basisFromCase}
                النطاق: ${d.scope}
                قوة الدفع: ${d.strength === 'Weak' ? 'ضعيف' : d.strength === 'Medium' ? 'متوسط' : 'قوي'}`
                )
                .join("\n\n")}
                
                ------------------------------------
                
                الدفوع الموضوعية:
                ${defenses.defensesSubstantive
                .map(
                    (d, index: number) =>
                        `${index + 1}- ${d.defenseTitle}
                الأساس: ${d.basisFromCase}
                النطاق: ${d.scope}
                قوة الدفع: ${d.strength === 'Weak' ? 'ضعيف' : d.strength === 'Medium' ? 'متوسط' : 'قوي'}`
                )
                .join("\n\n")}
                
                ------------------------------------
                
                الدفوع المتعلقة بالأدلة:
                ${defenses.defensesEvidentiary
                .map(
                    (d, index: number) =>
                        `${index + 1}- ${d.defenseTitle}
                الأساس: ${d.basisFromCase}
                النطاق: ${d.scope}
                قوة الدفع: ${d.strength === 'Weak' ? 'ضعيف' : d.strength === 'Medium' ? 'متوسط' : 'قوي'}`
                )
                .join("\n\n")}
                
                ====================================
                سابعاً: الطلبــات الختامية
                ====================================
                ${finalRequirements.finalPrayers
                .map(
                    (r, index: number) =>
                        `${index + 1}- (${r.requestLevel}) ${r.requestText}`
                )
                .join("\n")}
                
                والله ولي التوفيق ،،،
    `;
    };



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
                                new TextRun(valueText),
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


    useEffect(() => {
        if (summary) {
            setValueText(formatSummaryToText(summary));
        }
    }, [summary])

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
                            value={valueText}
                            onChange={(e) => setValueText(e.target.value)}
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