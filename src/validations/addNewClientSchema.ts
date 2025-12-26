import z from "zod";

const addNewClientSchema = z.object({
    fullName: z.string()
        .nonempty("الاسم مطلوب")
        .min(2, "الاسم يجب أن يكون على الأقل 2 أحرف")
        .max(50, "الاسم لا يجب أن يزيد عن 50 حرف"),

    phone: z.string()
        .nonempty("رقم الهاتف مطلوب")
        .regex(/^01[0-9]{9}$/, "رقم الهاتف غير صالح"),

    email: z.string()
        .nonempty("البريد الإلكتروني مطلوب")
        .email("البريد الإلكتروني غير صالح"),

    nationalId: z.string()
        .nonempty("الرقم القومي مطلوب")
        .regex(/^[0-9]{14}$/, "الرقم القومي يجب أن يتكون من 14 رقم"),

    notes: z.string()
        .max(200, "الملاحظات لا يجب أن تزيد عن 200 حرف")
        .optional(),
});

type addNewClientType = z.infer<typeof addNewClientSchema>;
export { addNewClientSchema, type addNewClientType };