import z from "zod";

const addNewCaseFromOCRSchema = z.object({
    caseTitle: z.string()
        .nonempty("عنوان القضية مطلوب")
        .min(3, "عنوان القضية يجب أن يكون 3 أحرف على الأقل")
        .max(100, "عنوان القضية لا يجب أن يزيد عن 100 حرف"),
    caseNumber: z.string()
        .nonempty("رقم القضية مطلوب")
        .max(100, "رقم القضية لا يجب أن يزيد عن 100 حرف")
        .refine((val) => /\d/.test(val), {
            message: "رقم القضية يجب أن يحتوي على رقم واحد على الأقل",
        }),
    caseType: z.number(),

    clientName: z.string()
        .nonempty("اسم الموكل مطلوب")
        .min(2, "اسم الموكل يجب أن يكون على الأقل حرفين")
        .max(100, "اسم الموكل لا يجب أن يزيد عن 100 حرف"),

    opponentName: z.string()
        .nonempty("اسم الخصم مطلوب")
        .min(2, "اسم الخصم يجب أن يكون على الأقل حرفين")
        .max(100, "اسم الخصم لا يجب أن يزيد عن 100 حرف"),

    court: z.string()
        .nonempty("اسم المحكمة مطلوب")
        .min(2, "المحكمة يجب أن تتكون من حرفين على الأقل"),

    caseDescription: z.string()
        .nonempty("وصف القضية مطلوب")
        .min(10, "الوصف يجب أن يكون 10 أحرف على الأقل")
        .max(5000, "الوصف لا يجب أن يزيد عن 5000 حرف"),

    caseFacts: z.string()
        .nonempty("وقائع القضية مطلوبة")
        .min(10, "وقائع القضية يجب أن تكون 10 أحرف على الأقل")
        .max(5000, "وقائع القضية لا يجب أن تزيد عن 5000 حرف"),

    legalRequests: z.string()
        .nonempty("الطلبات القانونية مطلوبة")
        .min(5, "الطلبات القانونية يجب أن تكون 5 أحرف على الأقل")
        .max(5000, "الطلبات القانونية لا يجب أن تزيد عن 5000 حرف"),
});

type addNewCaseFromOCRType = z.infer<typeof addNewCaseFromOCRSchema>;
export { addNewCaseFromOCRSchema, type addNewCaseFromOCRType };